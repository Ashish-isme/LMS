const cloudinary = require("cloudinary").v2;

//configuration with env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
      type: "authenticated",
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error while uploading to cloudinary");
  }
};

const generateSignedUrl = (publicId, resourceType = "video") => {
  return cloudinary.private_download_url(publicId, resourceType, {
    sign_url: true,
    type: "authenticated",
    expires_at: Math.floor(Date.now() / 1000) + 450,
  });
};

const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Failed to delete the media from cloudinary");
  }
};

module.exports = {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
  generateSignedUrl,
};
