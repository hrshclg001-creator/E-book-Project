import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "../controllers/user.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/verify-email/:token").get(verifyEmail);
// Auth Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

// Password Reset Routes
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

// Example of Role-Based Route
router
  .route("/admin/stats")
  .get(verifyJWT, authorizeRoles("admin"), (req, res) => {
    res.status(200).json({ success: true, data: "Admin confidential stats" });
  });

export default router;
