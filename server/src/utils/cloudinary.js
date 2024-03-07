// Require the Cloudinary library
const cloudinary = require("cloudinary");

// Set the Cloudinary configuration
const cloudinaryConfig = (...params) => {
  const [CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET] =
    params;
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
};

// Upload an image to Cloudinary
const cloudinaryUploadImg = async (path) => {
  try {
    const response = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Delete an image from Cloudinary

const cloudinaryDeleteImg = async (public_id) => {
  try {
    const response = await cloudinary.uploader.destroy(public_id);
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  cloudinaryConfig,
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
};
