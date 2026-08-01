import ReadingProgress from "../models/readingProgress.model.js";
import Book from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

// 1. Get Purchased Books (User Library)
const getMyLibrary = asyncHandler(async (req, res) => {
  // ReadingProgress se user ki saari kharidi hui books fetch karein
  const library = await ReadingProgress.find({ user: req.user._id })
    .populate({
      path: "book",
      select: "title author coverImage description",
    })
    .sort({ updatedAt: -1 }); // Recently accessed/bought pehle aayengi

  return res
    .status(200)
    .json(new ApiResponse(200, library, "User library fetched successfully"));
});

// 2. Download Authorization & Generate Secure PDF URL
const getSecureBookAccess = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  // Check 1: Kya user ne ye book sach mein kharidi hai? (ReadingProgress exist karta hai?)
  const hasAccess = await ReadingProgress.findOne({
    user: req.user._id,
    book: bookId,
  });

  // Agar admin hai, toh bypass kar de, warna ownership zaroori hai
  if (!hasAccess && req.user.role !== "admin") {
    throw new ApiError(403, "Unauthorized. You have not purchased this book.");
  }

  // Book data nikalein (jisme PDF ki actual Cloudinary URL hai)
  const book = await Book.findById(bookId).select("title pdfUrl");

  if (!book || !book.pdfUrl) {
    throw new ApiError(404, "PDF content is not available for this book.");
  }

  //   return res.status(200).json(
  //     new ApiResponse(
  //       200,
  //       {
  //         bookId: book._id,
  //         title: book.title,
  //         downloadUrl: book.pdfUrl
  //       },
  //       "Secure access granted"
  //     )
  //   );

  try {
    const pdfResponse = await axios.get(book.pdfUrl, {
      responseType: "stream",
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${book.title.replace(/"/g, "")}.pdf"`,
    );

    pdfResponse.data.pipe(res);
  } catch (error) {
    throw new ApiError(500, "Error streaming the PDF file from the server.");
  }
});

export { getMyLibrary, getSecureBookAccess };
