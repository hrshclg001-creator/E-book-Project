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
    pdfUrl: pdfFile.url, // Yahan PDF ka URL save ho raha hai
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, book, "Book created successfully"));
});

const getAllBooks = asyncHandler(async (req, res) => {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = req.query;
  const query = {};
  // 1. Search Query (Title ya Author ke basis par regex search)
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { author: { $regex: keyword, $options: "i" } },
    ];
  }

  // 2. Filter by Category
  if (category) {
    query.category = category;
  }

  // 3. Filter by Price Range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    //MongoDB will return 200 ≤ price ≤ 600
  }

  // 4. Pagination Setup
  const skip = (Number(page) - 1) * Number(limit); // skip = (3-1)*10

  //This searches MongoDB using the filters you built.
  const books = await Book.find(query)
    .populate("category", "name")
    .skip(skip)
    .limit(Number(limit))
    .sort({
      createdAt: -1,
    });

  const totalBooks = await Book.countDocuments(query);
  const totalPages = Math.ceil(totalBooks / Number(limit));

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        books,
        pagination: {
          totalBooks,
          totalPages,
          currentPage: Number(page),
          limit: Number(limit),
        },
      },
      "Books fetched successfully",
    ),
  );
});

//getting a single book

const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate("category", "name description");
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, book, "Book fetched successfully"));
});

// updating the book
const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, author, description, price, category } = req.body;

  let book = await Book.findById(id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  // Check karna ki update karne wala user hi book ka owner hai ya admin hai
  if (
    book.owner.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "You are not authorized to edit this book");
  }

  const updateData = { title, author, description, price, category };
  // Agar user nayi Cover Image bhej raha hai
  if (req.files && req.files.coverImage) {
    const coverLocalPath = req.files.coverImage[0].path;
    const coverImage = await uploadOnCloudinary(coverLocalPath);
    if (!coverImage.url) throw new ApiError(500, "Error uploading cover image");
    updateData.coverImage = coverImage.url;
  }

  // Agar user nayi PDF bhej raha hai
  if (req.files && req.files.pdfUrl) {
    const pdfLocalPath = req.files.pdfUrl[0].path;
    const pdfFile = await uploadOnCloudinary(pdfLocalPath);
    if (!pdfFile.url) throw new ApiError(500, "Error uploading PDF file");
    updateData.pdfUrl = pdfFile.url;
  }

  // Database update karna
  book = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true, //Before updating the document, check whether the new values satisfy the schema's validation rules.
  });

  return res
    .status(200)
    .json(new ApiResponse(200, book, "Book updated successfully"));
});
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (
    book.owner.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "You are not authorized to delete this book");
  }

  // Database se delete karna
  await Book.findByIdAndDelete(id);
  

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Book deleted successfully"));
});

// Naye controllers ko export karna na bhoolein
export { createBook, getAllBooks, getBookById, updateBook, deleteBook };

