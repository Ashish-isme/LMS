const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
  generateSignedUrl,
} = require("../../helpers/cloudinary");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Asset Id is required",
      });
    }

    await deleteMediaFromCloudinary(id);

    res.status(200).json({
      success: true,
      message: "Asset deleted succcessfully form cloudinary",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error occured while deleting file" });
  }
});

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path)
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (event) {
    console.log(event);

    res
      .status(500)
      .json({ success: false, message: "Error in bulk uploading files" });
  }
});

// for signed access
router.get("/signed-url", async (req, res) => {
  try {
    const { publicId, resourceType = "video" } = req.query;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "public is required",
      });
    }

    const signedUrl = generateSignedUrl(publicId, {
      resource_type: resourceType,
      expires_in: 3600,
    });

    res.status(200).json({
      success: true,
      data: { signedUrl },
    });
  } catch (error) {
    console.error("Error while generating signed URL", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate signed URL",
    });
  }
});

module.exports = router;
