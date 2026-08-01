import { Router } from "express";
import {
  addReview,
  updateReview,
  deleteReview,
  getBookReviews,
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/book/:bookId").get(getBookReviews);

router.use(verifyJWT);

router.route("/book/:bookId").post(addReview);

router.route("/:reviewId").put(updateReview).delete(deleteReview);

export default router;
