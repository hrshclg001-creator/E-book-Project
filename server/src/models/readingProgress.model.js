import mongoose from "mongoose";

const readingProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    progressPercentage: { type: Number, default: 0 }, // 0 to 100
    isCompleted: { type: Boolean, default: false },
    bookmarks : [
      {
        type : Number,
      }
    ],
    notes : [
      {
        pageNumber : Number,
        text : String,
        createdAt : {
          type : Date,
          default : Date.now,
        }
      }
    ]
  },
  { timestamps: true },
);

// A user should only have one progress record per book
readingProgressSchema.index({ user: 1, book: 1 }, { unique: true });

export default mongoose.model("ReadingProgress", readingProgressSchema);
