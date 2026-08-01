import { razorpayInstance } from "../config/razorpay.js";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import PDFDocument from "pdfkit";
import { sendEmail } from "../utils/sendEmail.js";
import readingProgressModel from "../models/readingProgress.model.js";
import { sendOrderConfirmationEmail } from "../services/email.service.js";
const createPaymentOrder = asyncHandler(async (req, res) => {
  try {
    // fecthing the cart of current user
    const cart = await Cart.findOne({
      user: req.user_id,
    }).populate("items-book");

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Your cart is empty");
    }

    let totalAmount = 0;
    cart.items.forEach((item) => {
      totalAmount += item.book.price * item.quantity;
    });

    const options = {
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
    // 4. Razorpay par order creation
    const razorpayOrder = await razorpayInstance.orders.create(options);

    if (!razorpayOrder) {
      throw new ApiError(500, "Error creating Razorpay order");
    }
    // database m order ko save krdiya
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "PENDING",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          orderId: order._id,
          razorpayOrderId: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
        "Payment order created successfully.",
      ),
    );
  } catch (error) {
    throw new ApiError(404, "Payment Order not created!");
  }
});

// verification of payment signature
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, "Payment details are missing");
  }

  // 1. Expected signature generation
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  // 2. Signature match
  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Populate user to get email for the confirmation
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        paymentStatus: "COMPLETED",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    ).populate("user", "name email"); // Populate kiya taaki email bhej sakein

    // 3. Update Reading Progress
    for (const item of order.items) {
      const existingProgress = await readingProgressModel.findOne({
        user: order.user._id,
        book: item.book,
      });

      if (!existingProgress) {
        await readingProgressModel.create({
          user: order.user._id,
          book: item.book,
          progressPercentage: 0,
          isCompleted: false,
        });
      }
    } // <-- LOOP YAHAN CLOSE HUA

    // Order confirmation email bhejein
    await sendOrderConfirmationEmail(order.user.email, order.user.name, order);

    // 4. User ki cart clear kar dein kyunki payment ho chuki hai
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Payment verified successfully"));
  } else {
    // Payment failure case
    await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { paymentStatus: "FAILED" }
    );
    throw new ApiError(400, "Payment verification failed. Signature mismatch.");
  }
});
  // handling payment failure
  const handlePaymentFailure = asyncHandler(async (req, res) => {
    const { razorpay_order_id, reason } = req.body;

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        paymentStatus: "FAILED",
        paymentFailureReason: reason || "Unknown user failure",
      },
      { new: true },
    );

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Payment failure recorded"));
  });

  // 1. Get Order History (For Logged-in User)
  const getOrderHistory = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.book", "title author coverImage price")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "Order history fetched successfully"));
  });

  // 2. Update Order Status (For Admin Only)
  const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // e.g., 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'

    const order = await Order.findById(id);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    order.orderStatus = status; // Assuming orderStatus is a field in your Schema
    await order.save();

    return res
      .status(200)
      .json(new ApiResponse(200, order, `Order status updated to ${status}`));
  });

  // generae and Email invoice

  const generateAndSendInvoice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate(
      "items.book",
      "title price",
    );
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    // Ensuring only the owner or admin can generate this
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      throw new ApiError(403, "Unauthorized to view this invoice");
    }

    // generating the pdf - in RAM

    const doc = new PDFDocument(); // blank pdf
    let buffers = []; // empty array , we need this Because PDFKit generates the PDF little by little, not all at once.

    doc.on("data", buffers.push.bind(buffers));

    // PDF Content Design
    doc.fontSize(20).text("BookVerse Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`Payment Status: ${order.paymentStatus}`);
    doc.moveDown();

    doc.text("---------------------------------------------------------");
    order.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.book.title} - Qty: ${item.quantity} - Rs. ${item.book.price}`,
      );
    });
    doc.text("---------------------------------------------------------");
    doc.moveDown();
    doc
      .fontSize(14)
      .text(`Total Amount: Rs. ${order.totalAmount}`, { align: "right" });

    // PDF End
    doc.end();

    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      // Frontend ko response bhejna (taaki browser me download ho sake)
      // Aur background mein email bhi bhej dena
      try {
        await sendEmail({
          email: req.user.email,
          subject: `Your Invoice for Order #${order._id}`,
          message:
            "Thank you for shopping at BookVerse. Please find your invoice attached.",
          attachments: [
            {
              filename: `invoice_${order._id}.pdf`,
              content: pdfData,
            },
          ],
        });
      } catch (error) {
        console.log("Invoice email failed to send, but PDF generated.");
      }

      // Response header set karna taaki frontend PDF samajh sake
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice_${order._id}.pdf`,
      );
      return res.status(200).send(pdfData);
    });
  });




  export {
    createPaymentOrder,
    verifyPayment,
    handlePaymentFailure,
    getOrderHistory,
    updateOrderStatus,
    generateAndSendInvoice,
  };
