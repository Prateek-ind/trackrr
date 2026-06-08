const User = require("../models/user.model");

const uploadAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: req.file.path } },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Avatar uploaded successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: "Avatar upload failed" });
  }
};

module.exports = {uploadAvatar}
