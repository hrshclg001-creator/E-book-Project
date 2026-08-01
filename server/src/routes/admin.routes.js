import { Router } from "express";
import {
  getDashboardStats,
  getSalesAnalytics,
  getUserAnalytics,
  getTopSellingBooks,
  getAllOrders,
  getAllUsers,
  updateUserRole,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Strict Security: Sabhi admin routes ke liye user logged in aur Admin hona chahiye
router.use(verifyJWT, verifyAdmin);

// Dashboard & Analytics Routes
router.route("/dashboard").get(getDashboardStats);
router.route("/analytics/sales").get(getSalesAnalytics);
router.route("/analytics/users").get(getUserAnalytics);
router.route("/analytics/books").get(getTopSellingBooks);

// Management Routes
router.route("/orders").get(getAllOrders);
router.route("/users").get(getAllUsers);
router.route("/users/:userId/role").patch(updateUserRole);

export default router;
