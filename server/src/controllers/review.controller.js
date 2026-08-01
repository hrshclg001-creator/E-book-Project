import Review from "../models/review.model.js";
import Book from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// 1. Add Review
const addReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    throw new ApiError(400, "Rating and comment are required");
  }

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  // Check if user already submitted a review
  const alreadyReviewed = await Review.findOne({
    user: req.user._id,
    book: bookId,
  });

  if (alreadyReviewed) {
    throw new ApiError(400, "You have already reviewed this book");
  }

  const review = await Review.create({
    user: req.user._id,
    book: bookId,
    rating: Number(rating),
    comment,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, review, "Review added successfully"));
});

// 2. Update Review
const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  let review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  // Ensure the user updating the review is the one who wrote it
  if (review.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only update your own reviews");
  }

  if (rating) review.rating = Number(rating);
  if (comment) review.comment = comment;

  await review.save(); // this triggers the pre/post save hooks to update average rating

  return res
    .status(200)
    .json(new ApiResponse(200, review, "Review updated successfully"));
});

// 3. Delete Review
const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Not authorized to delete this review");
  }

  await review.deleteOne(); // Using deleteOne instead of findByIdAndDelete to trigger middleware if needed

  // Manually trigger the static method after deletion
  await review.constructor.calcAverageRatings(review.book);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Review deleted successfully"));
});

// 4. Get All Reviews for a Book (Public Route)
const getBookReviews = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const reviews = await Review.find({ book: bookId })
    .populate("user", "name avatar") // Assuming user has a name and avatar
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
});

export { addReview, updateReview, deleteReview, getBookReviews };
