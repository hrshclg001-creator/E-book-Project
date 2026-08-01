import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import Order from "../models/order.model.js"; // Assuming you have an Order model
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// 1. Overall Dashboard Statistics (Totals)
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalBooks = await Book.countDocuments();

  // Total Revenue & Orders Calculation
  const orderStats = await Order.aggregate([
    {
      $match: { paymentStatus: "COMPLETED" }, // Sirf successful orders
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  const stats = {
    totalUsers,
    totalBooks,
    totalOrders: orderStats[0]?.totalOrders || 0,
    totalRevenue: orderStats[0]?.totalRevenue || 0,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, stats, "Dashboard statistics fetched successfully"),
    );
});

// 2. Sales & Revenue Analytics (Month-wise)
const getSalesAnalytics = asyncHandler(async (req, res) => {
  const salesData = await Order.aggregate([
    { $match: { paymentStatus: "COMPLETED" } },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        revenue: { $sum: "$totalAmount" },
        salesCount: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort chronologically
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, salesData, "Sales analytics fetched successfully"),
    );
});

// 3. User Analytics (Registration Trends)
const getUserAnalytics = asyncHandler(async (req, res) => {
  const userData = await User.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        newUsers: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, userData, "User analytics fetched successfully"),
    );
});

// 4. Book Analytics (Top Selling Books)
const getTopSellingBooks = asyncHandler(async (req, res) => {
  const topBooks = await Order.aggregate([
    { $match: { paymentStatus: "COMPLETED" } },
    { $unwind: "$items" }, // Break array into separate documents
    {
      $group: {
        _id: "$items.book",
        totalSold: { $sum: "$items.quantity" },
        revenueGenerated: {
          $sum: { $multiply: ["$items.price", "$items.quantity"] },
        },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 }, // Top 5 books
    {
      // Populate book details
      $lookup: {
        from: "books", // Database collection name
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    { $unwind: "$bookDetails" },
    {
      $project: {
        _id: 1,
        totalSold: 1,
        revenueGenerated: 1,
        title: "$bookDetails.title",
        author: "$bookDetails.author",
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, topBooks, "Top selling books fetched successfully"),
    );
});
// 5. Order Management (Get All Orders with Pagination)
const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .skip(Number(skip))
    .limit(Number(limit));

  const total = await Order.countDocuments();

  return res.status(200).json(
    new ApiResponse(200, { orders, total, page, totalPages: Math.ceil(total / limit) }, "Orders fetched successfully")
  );
});

// 6. User Management (Get All Users)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, users, "Users fetched successfully")
  );
});

// 7. User Management (Change User Role)
const updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    throw new ApiError(400, "Invalid role type");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, user, `User role updated to ${role}`)
  );
});

export {
  getDashboardStats,
  getSalesAnalytics,
  getUserAnalytics,
  getTopSellingBooks,
  getAllOrders,
  getAllUsers,
  updateUserRole
};