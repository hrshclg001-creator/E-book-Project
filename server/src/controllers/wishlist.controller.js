import Wishlist from "../models/wishlist.model.js";
import Book from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// 1. Add Book to Wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  // Check if book actually exists
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  // Find user's wishlist or create a new one if it doesn't exist
  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      books: [bookId],
    });
  } else {
    // Check if the book is already in the wishlist
    if (wishlist.books.includes(bookId)) {
      throw new ApiError(400, "Book is already in your wishlist");
    }

    // Add book to the array
    wishlist.books.push(bookId);
    await wishlist.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "Book added to wishlist successfully"));
});

// 2. Remove Book from Wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    throw new ApiError(404, "Wishlist not found");
  }

  // Check if book exists in the wishlist
  if (!wishlist.books.includes(bookId)) {
    throw new ApiError(404, "Book is not in your wishlist");
  }

  // Remove the book from the array using MongoDB $pull operator
  wishlist.books = wishlist.books.filter((id) => id.toString() !== bookId);
  await wishlist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "Book removed from wishlist successfully"));
});

// 3. Get User's Wishlist
const getWishlist = asyncHandler(async (req, res) => {
  // Find wishlist and populate the book details so frontend can display cover/title/price
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
    path: "books",
    select: "title author price coverImage rating", // Sirf zaroori fields fetch karenge
  });

  if (!wishlist) {
    // Agar wishlist nahi bani hai, toh empty array return karein error ke bajay
    return res
      .status(200)
      .json(new ApiResponse(200, { books: [] }, "Wishlist is empty"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "Wishlist fetched successfully"));
});

export { addToWishlist, removeFromWishlist, getWishlist };