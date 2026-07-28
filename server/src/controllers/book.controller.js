import Book from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBook = asyncHandler(async (req, res) => {
  const { title, author, description, price, category } = req.body;

  if (!title || !author || !price) {
    throw new ApiError(400, "Title, author, and price are required");
  }

  // 2. Multer se aayi hui files ka local path nikalna
  const coverLocalPath = req.files?.coverImage[0]?.path;
  const pdfLocalPath = req.files?.pdfUrl[0]?.path;
  if (!coverLocalPath || !pdfLocalPath) {
    throw new ApiError(400, "Cover image and PDF file are required");
  }
  // 3. Local server se files ko Cloudinary par upload karna
  const coverImage = await uploadOnCloudinary(coverLocalPath);
  const pdfFile = await uploadOnCloudinary(pdfLocalPath);
  if (!coverImage.url || !pdfFile.url) {
     throw new ApiError(500, "Error uploading files to Cloudinary");
  }


  // 4. Cloudinary se mile URLs ko MongoDB mein save karna
  const book = await Book.create({ 
      title, 
      author, 
      description, 
      price,
      category,
      coverImage: coverImage.url, // Yahan Cloudinary ka URL save ho raha hai
      pdfUrl: pdfFile.url         // Yahan PDF ka URL save ho raha hai
  });

  return res
    .status(201)
    .json(new ApiResponse(201, book, "Book created successfully"));
});

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  return res
    .status(200)
    .json(new ApiResponse(200, books, "Books fetched successfully"));
});

export { createBook, getAllBooks };
