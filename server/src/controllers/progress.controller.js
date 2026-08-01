import ReadingProgress from "../models/readingProgress.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// 1. Get Progress (Continue Reading)
const getBookProgress = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const progress = await ReadingProgress.findOne({
    user: req.user._id,
    book: bookId,
  });

  if (!progress) {
    throw new ApiError(
      404,
      "Progress not found. Have you purchased this book?",
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, progress, "Reading progress fetched successfully"),
    );
});

// 2. Save Current Page & Calculate Percentage
const updateCurrentPage = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { currentPage, totalPages } = req.body;

  if (!currentPage || !totalPages) {
    throw new ApiError(400, "Current page and total pages are required");
  }

  const progressPercentage = Math.round((currentPage / totalPages) * 100);
  const isCompleted = progressPercentage >= 100;

  const progress = await ReadingProgress.findOneAndUpdate(
    { user: req.user._id, book: bookId },
    {
      currentPage,
      totalPages,
      progressPercentage,
      isCompleted,
    },
    { new: true },
  );

  if (!progress) {
    throw new ApiError(404, "Progress record not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Progress updated successfully"));
});

// 3. Toggle Bookmark (Add/Remove)
const toggleBookmark = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { pageNumber } = req.body;

  const progress = await ReadingProgress.findOne({
    user: req.user._id,
    book: bookId,
  });
  if (!progress) throw new ApiError(404, "Progress record not found");

  const bookmarkIndex = progress.bookmarks.indexOf(pageNumber);

  if (bookmarkIndex === -1) {
    progress.bookmarks.push(pageNumber);
  } else {
    progress.bookmarks.splice(bookmarkIndex, 1);
  }

  await progress.save();

  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Bookmark updated successfully"));
});

// 4. Save/Add Note
const addNote = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { pageNumber, text } = req.body;

  if (!text || text.trim() === "") {
    throw new ApiError(400, "Note text cannot be empty");
  }

  const progress = await ReadingProgress.findOneAndUpdate(
    { user: req.user._id, book: bookId },
    {
      $push: { notes: { pageNumber, text } },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Note added successfully"));
});

const getReadingStatistics = asyncHandler(async (req, res) => {
  // MongoDB Aggregation Pipeline to calculate stats for the logged-in user
  const stats = await ReadingProgress.aggregate([
    {
      $match: { user: req.user._id },
    },
    {
      $group: {
        _id: null,
        totalBooksStarted: { $sum: 1 },
        totalBooksCompleted: {
          $sum: { $cond: [{ $eq: ["$isCompleted", true] }, 1, 0] },
        },
        averageProgress: { $avg: "$progressPercentage" },
        totalPagesRead: { $sum: "$currentPage" }, // Approximation
      },
    },
  ]);

  const defaultStats = stats[0] || {
    totalBooksStarted: 0,
    totalBooksCompleted: 0,
    averageProgress: 0,
    totalPagesRead: 0,
  };

  defaultStats.averageProgress =
    Math.round(defaultStats.averageProgress * 100) / 100;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        defaultStats,
        "Reading statistics fetched successfully",
      ),
    );
});

export {
  getBookProgress,
  updateCurrentPage,
  toggleBookmark,
  addNote,
  getReadingStatistics,
};