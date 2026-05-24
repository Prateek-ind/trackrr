const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/job.controller");
const protect = require("../middlewares/protect.middleware");
const upload = require("../config/multerStorage");
const cloudinary = require("../config/cloudinary");
const https = require("https");

// Upload
router.post("/resume", protect, upload.single("resume"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    res.json({
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Proxy — must be before /:id
router.get("/resume/proxy", protect, async (req, res) => {
  const { url, publicId } = req.query;

  if (
    !url ||
    typeof url !== "string" ||
    !url.startsWith("https://res.cloudinary.com")
  ) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    let response = await fetch(url);

    if (
      !response.ok &&
      response.status === 401 &&
      publicId &&
      typeof publicId === "string"
    ) {
      const signedUrl = cloudinary.utils.private_download_url(publicId, "pdf", {
        resource_type: "raw",
        type: "upload",
        secure: true,
        expires_at: Math.floor(Date.now() / 1000) + 60,
      });

      response = await fetch(signedUrl);
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch PDF from Cloudinary: ${response.status} ${response.statusText}`,
      );
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Content-Length", buffer.byteLength);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Proxy error:", error);
    res
      .status(500)
      .json({
        message: "Proxy failed",
        error: error instanceof Error ? error.message : String(error),
      });
  }
});

router.get("/", protect, getJobs);
router.get("/:id", protect, getJobById);
router.post("/", protect, createJob);
router.put("/:id/edit", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;
