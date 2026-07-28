import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Node.js ka built-in file system module

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // File ko cloudinary par upload karna
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // 'auto' se image, pdf, video sab detect ho jata hai
    });

    // Upload successful hone ke baad local file ko delete kar dena
    fs.unlinkSync(localFilePath);

    return response; // Is response mein cloudinary ka URL (response.url) hota hai
  } catch (error) {
    // Agar upload fail ho jaye, toh bhi local server se file hta deni chahiye
    // taaki corrupt/un-uploaded files server par jama na hon
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
