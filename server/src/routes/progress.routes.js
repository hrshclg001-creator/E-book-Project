import { Router } from "express";
import {
  getBookProgress,
  updateCurrentPage,
  toggleBookmark,
  addNote,
  getReadingStatistics,
} from "../controllers/progress.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/stats").get(getReadingStatistics);

router
  .route("/:bookId")
  .get(getBookProgress)
  .patch(updateCurrentPage);

router.route("/:bookId/bookmark").patch(toggleBookmark);
router.route("/:bookId/note").post(addNote);

export default router;
