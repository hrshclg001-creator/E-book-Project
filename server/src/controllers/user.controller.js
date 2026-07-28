import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validation check
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // 3. Create user in DB (Password apne aap hash ho jayega pre-save hook se)
  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const accessToken = user.generateAccessToken();
  const loggedInUser = await User.findById(user._id).select("-password");
  const options = {
    httpOnly: true, // Isse frontend ki JavaScript cookie ko read/modify nahi kar sakti
    secure: true, // HTTPS par kaam karega
  };

  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .json(
	new ApiResponse(
		200,
		{
			user : loggedInUser,
			accessToken
		},
		"User logged in successfully"
	)
  );
});

const logoutUser = asyncHandler(async(req, res)=>{
	const options = {
		httpOnly : true,
		secure : true
	};
	return res.status(200)
	.clearCookie("accessToken",options)
	.json(new ApiResponse(200,{}, "User logged out successfully."));
});

export { registerUser, loginUser, logoutUser };
