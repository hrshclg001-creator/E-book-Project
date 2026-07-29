import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Middleware import kiya

const router = Router();

// Route chaining mein hum specify kar sakte hain kahan security lagani hai
router
  .route("/")
  .get(getAllBooks) // Yeh public rahega
  .post(
    verifyJWT, // 1. Sabse pehle check karo ki user logged in hai ya nahi
    upload.fields([
      // 2. Agar logged in hai, tabhi Multer se files accept karo
      { name: "coverImage", maxCount: 1 },
      { name: "pdfUrl", maxCount: 1 },
    ]),
    createBook, // 3. Sab theek ho toh database mein book create kar do
  );

// /api/v1/books/:id (Dynamic ID routes)
router
  .route("/:id")
  .get(getBookById) // Public: View a single book
  .put(
    verifyJWT,
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "pdfUrl", maxCount: 1 },
    ]),
    updateBook,
  )
  .delete(verifyJWT, deleteBook);

export default router;
