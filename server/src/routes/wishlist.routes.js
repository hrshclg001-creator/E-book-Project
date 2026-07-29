import { Router } from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.use(verifyJWT);

router.route("/").get(getWishlist);

router.route("/:bookId").post(addToWishlist);

router.route("/:bookId").delete(removeFromWishlist);

export default router;
