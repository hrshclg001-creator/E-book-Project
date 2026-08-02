import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";


import bookRouter from "./routes/book.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import libraryRouter from "./routes/library.routes.js";
import progressRouter from "./routes/progress.routes.js";
import reviewRouter from "./routes/review.routes.js";
import adminRouter from "./routes/admin.routes.js";
const app = express();

// 1. HTTP Security Headers (XSS Protection & more)
app.use(helmet());

// 2. Cross-Site Scripting (XSS) Prevention
app.use(xss());

// 3. NoSQL Injection Protection
// Yeh req.body, req.query, aur req.params se Mongoose operators (jaise $ aur .) ko hata deta hai
app.use(mongoSanitize());

// 4. API Rate Limiting (Brute Force aur DDoS Attacks se bachne ke liye)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes ka window
  max: 100, // Ek IP address se 15 minute mein maximum 100 requests allow hongi
  message: "Too many requests from this IP, please try again after 15 minutes",
});
// Rate limiter ko sabhi /api routes par apply karein
app.use("/api", limiter);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/admin", adminRouter);
export { app };
