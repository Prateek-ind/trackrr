const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect.middleware");
const multer = require("multer");
const {
  analyseResume,
  gapRoadmap,
  generateResume,
  complieLaTeX,
  generateLatex,
} = require("../controllers/resume.controller");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyse", upload.single("resume"), analyseResume);
router.post("/roadmap", gapRoadmap);
router.post("/generate", generateLatex);

module.exports = router;
