import Category from "../models/category.model.js";
import Book from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// 1. Add Category
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  // Check if category already exists
  const existingCategory = await Category.findOne({ name: name.trim() });
  if (existingCategory) {
    throw new ApiError(409, "Category with this name already exists");
  }

  const category = await Category.create({
    name: name.trim(),
    description,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

// 2. Get All Categories
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

// 3. Update Category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Agar name update ho raha hai, toh check karein ki naya name pehle se toh nahi hai
  if (name && name.trim() !== category.name) {
    const duplicateCheck = await Category.findOne({ name: name.trim() });
    if (duplicateCheck) {
      throw new ApiError(409, "Another category with this name already exists");
    }
    category.name = name.trim();
  }

  if (description) {
    category.description = description;
  }

  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});

// 4. Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Safety Check: Make sure no books are using this category before deleting
  const linkedBooks = await Book.findOne({ category: id });
  
  if (linkedBooks) {
    throw new ApiError(
      400,
      "Cannot delete this category because it has books associated with it. Please update or delete those books first."
    );
  }

  await Category.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Category deleted successfully"));
});

export { createCategory, getAllCategories, updateCategory, deleteCategory };