import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route - Koi bhi user categories dekh sakta hai
router.route("/").get(getAllCategories);

// Secure routes - Sirf admin in routes ko access kar sakta hai
router.route("/").post(verifyJWT, authorizeRoles("admin"), createCategory);

router
  .route("/:id")
  .put(verifyJWT, authorizeRoles("admin"), updateCategory)
  .delete(verifyJWT, authorizeRoles("admin"), deleteCategory);

export default router;
