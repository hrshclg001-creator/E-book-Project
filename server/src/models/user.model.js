import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    library: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    refreshToken: {
      type: String,
    },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpiry: { type: Date },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Date },
  },
  { timestamps: true },
);

// Database mein save hone se thik pehle password ko hash karna
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Check karna ki login ke time dala gaya password sahi hai ya nahi
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access Token generate karna
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};
//Refresh Token Generate Karna
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

// NAYA METHOD: Forgot Password Token Generate Karna
// It does three important things:

// Generates a random password reset token.
// Stores a hashed version of the token in the database.
// Returns the original token so it can be emailed to the user.
userSchema.methods.getResetPasswordToken = function (){
  const resetToken = crypto.randomBytes(20).toString("hex");
  // this refers to the current user document
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

// Email Verification Token Generate Karna
userSchema.methods.generateEmailVerificationToken = function () {
  //Ek random hex string 
  const verificationToken = crypto.randomBytes(20).toString("hex");

  // Database mein save karne ke liye usko hash karein
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Expiry time
  this.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000;

  //Original un-hashed token return karein jo email URL mein jayega
  return verificationToken;
};


export default mongoose.model("User", userSchema);
