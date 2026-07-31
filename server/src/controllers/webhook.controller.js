import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import Order from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const razorpayWebhook = asyncHandler(async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  // Webhook ki authenticity check karein
  const isValid = validateWebhookSignature(
    JSON.stringify(req.body),
    signature,
    webhookSecret,
  );

  if (!isValid) {
    return res.status(400).send("Invalid Signature");
  }

  // Event type handle karein
  const event = req.body.event;

  if (event === "order.paid") {
    const paymentEntity = req.body.payload.payment.entity;
    const razorpay_order_id = paymentEntity.order_id;
    const razorpay_payment_id = paymentEntity.id;

    // Async DB update (Webhook frontend req-res cycle mein nahi hota)
    await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        paymentStatus: "COMPLETED",
        razorpayPaymentId: razorpay_payment_id,
      },
    );
    // Yahan hum cart explicitly clear nahi kar rahe hain
    // kyunki webhook background mein run hota hai aur humare paas user ID req.user mein nahi hai.
    // Ideally aap Order document mein user ID se cart clear kar sakte hain.
  }

  if (event === "payment.failed") {
    const paymentEntity = req.body.payload.payment.entity;
    await Order.findOneAndUpdate(
      { razorpayOrderId: paymentEntity.order_id },
      { paymentStatus: "FAILED" },
    );
  }

  // Webhook hamesha 200 OK mangta hai Razorpay se taaki retries na hon
  res.status(200).json({ status: "ok" });
});
