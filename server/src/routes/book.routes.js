import { Router } from "express";
import { createBook, getAllBooks } from "../controllers/book.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router
  .route("/")
  .post(
    upload.fields([
      {
        name: "coverImage",
        maxCount: 1,
      },
      {
        name: "pdfUrl",
        maxCount: 1,
      },
    ]),
    createBook,
  )
  .get(getAllBooks);

export default router;
