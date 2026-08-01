import { Router } from "express";
import {
  getMyLibrary,
  getSecureBookAccess,
} from "../controllers/library.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(verifyJWT);
router.route("/").get(getMyLibrary);
router.route("/:bookId/access").get(getSecureBookAccess);
export default router;