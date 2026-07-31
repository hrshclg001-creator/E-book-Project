import { Router } from "express";
import {
  createPaymentOrder,
  verifyPayment,
  handlePaymentFailure,
  getOrderHistory,
  updateOrderStatus,
  generateAndSendInvoice,
} from "../controllers/order.controller.js";
import { razorpayWebhook } from "../controllers/webhook.controller.js";
import { authorizedRoles, verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

// Webhook route ko auth ki zarurat nahi hai (Razorpay apne aap hit karega)
router.post("/webhook", razorpayWebhook);

// User protected routes
router.use(verifyJWT);

router.post("/create-order", createPaymentOrder);
router.post("/verify-payment", verifyPayment);
router.post("/payment-failed", handlePaymentFailure);
// Naye Routes
router.route("/history").get(getOrderHistory);
router.route("/:id/invoice").get(generateAndSendInvoice);

// Admin Only Route
router.route("/:id/status").put(authorizedRoles("admin"), updateOrderStatus);
export default router;
