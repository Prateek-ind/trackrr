// config/multerStorage.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req) => ({
    folder: `trackrr/resumes/${req.user.id}`,
    resource_type: "raw",
    format: "pdf",
    type: "upload",          // ← explicit upload type
    access_mode: "public",   // ← make it publicly accessible
  }),
});

module.exports = multer({ storage });