import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    // Category ko link kiya gaya hai
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // File URLs (Cloudinary aur S3 ke liye)
    coverImage: { type: String, required: true },
    pdfUrl: { type: String, required: true },

    // Rating aur Reviews
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    // Extra details
    language: { type: String, default: "English" },
    pages: { type: Number },
    isbn: { type: String },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Book", bookSchema);
