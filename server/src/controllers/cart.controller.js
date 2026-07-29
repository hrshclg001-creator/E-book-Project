import Cart from "../models/cart.model.js";
import Book from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItemToCart = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { quantity = 1 } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ book: bookId, quantity }],
    });
  } else {
    // Check karein ki kya book pehle se cart mein hai
    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId,
    );

    if (itemIndex > -1) {
      // Agar pehle se hai, toh quantity badha dein (useful for physical books)
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Agar nahi hai, toh naya item push karein
      cart.items.push({ book: bookId, quantity });
    }
    await cart.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

// 2. Remove Item from Cart

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // Book ko items array se filter out kar dein
  cart.items = cart.items.filter((item) => item.book.toString() !== bookId);
  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item removed from cart successfully"));
});

// 3. Update Quantity (Future Physical Books)
const updateItemQuantity = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    throw new ApiError(400, "Quantity cannot be less than 1");
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.book.toString() === bookId,
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Item not found in cart");
  }

  // Exact quantity set karein jo frontend se aayi hai
  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, cart, "Cart item quantity updated successfully"),
    );
});

// 4. Get Cart (with Populated Books & Total Price Calculation)
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "items.book",
    select: "title author price coverImage",
  });

  if (!cart) {
    return res
      .status(200)
      .json(new ApiResponse(200, { items: [], cartTotal: 0 }, "Cart is empty"));
  }

  // Calculate Cart Total dynamically (frontend ke liye aasani hogi)
  let cartTotal = 0;
  cart.items.forEach((item) => {
    if (item.book) {
      cartTotal += item.book.price * item.quantity;
    }
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { cart, cartTotal }, "Cart fetched successfully"),
    );
});

// 5. Clear Cart (Checkout ke baad ya manually clear karne ke liye)
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = []; // Items array ko khali kar dein
    await cart.save();
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Cart cleared successfully")
  );
});

export { addItemToCart, removeItemFromCart, updateItemQuantity, getCart, clearCart };