const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/user.controller");
const { uploadAvatar } = require("../controllers/avatar.controller");
const avatarUpload = require("../config/avatarStorage");

router.post("/avatar", avatarUpload.single("avatar"), uploadAvatar);

router.get("/profile", getProfile);
router.patch("/profile", updateProfile);

module.exports = router;
