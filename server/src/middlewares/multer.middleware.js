import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Name collision se bachne ke liye Date add kiya
  },
});

// File validation logic
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "coverImage") {
    // Sirf images allow karein
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          400,
          "Only JPEG, PNG, and WebP formats are allowed for images",
        ),
        false,
      );
    }
  } else if (file.fieldname === "pdfUrl") {
    // Sirf PDFs allow karein
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Only PDF files are allowed for books"), false);
    }
  } else {
    cb(new ApiError(400, "Unexpected file field"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // Maximum file size 50MB (Books badi ho sakti hain)
  },
});
