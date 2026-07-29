import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  getCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Sabhi cart routes protected hain
router.use(verifyJWT);

// GET /api/v1/cart - Get entire cart
// DELETE /api/v1/cart - Clear entire cart
router.route("/").get(getCart).delete(clearCart);

// POST /api/v1/cart/:bookId - Add item
// DELETE /api/v1/cart/:bookId - Remove item
// PATCH /api/v1/cart/:bookId - Update item quantity
router
  .route("/:bookId")
  .post(addItemToCart)
  .delete(removeItemFromCart)
  .patch(updateItemQuantity);

export default router;
