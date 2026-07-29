import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Token cookie se ya fir header se nikalna
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Token ko verify karna
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Database se user nikalna aur password field hide karna
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Request object mein user ko add kar dena taaki aage controllers ise use kar sakein
    req.user = user;
    next(); // Sab theek hai, agle function (controller) par jao
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const authorizedRoles = ( ...roles) =>{
  return (req, res,next) => {
    if( !roles.includes(req.user.role)){
      throw new ApiError(
        403,
        `Role : ${req.user.role} is not allowed to access this resource`
      )
    }
    next();
  }
}