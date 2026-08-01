import mongoose, { Schema } from "mongoose";
import Book from "./book.model.js";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// User ek book par sirf ek hi review de sakta hai
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Static method to calculate average rating using Aggregation Pipeline
reviewSchema.statics.calcAverageRatings = async function (bookId) {
  const stats = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: "$book",
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    if (stats.length > 0) {
      // Agar reviews hain toh Book model update karein
      await Book.findByIdAndUpdate(bookId, {
        rating: Math.round(stats[0].averageRating * 10) / 10, // Round to 1 decimal place
        reviewCount: stats[0].numOfReviews,
      });
    } else {
      // Agar saare reviews delete ho gaye hain toh reset kar dein
      await Book.findByIdAndUpdate(bookId, {
        rating: 0,
        reviewCount: 0,
      });
    }
  } catch (error) {
    console.error("Error calculating average rating: ", error);
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.book);
});

export default mongoose.model("Review", reviewSchema);
