const User = require("../models/user.model");

const updateProfile = async (req, res) => {
  console.log(req.body)
  const {
    username,
    name,
    location,
    phone,
    linkedin,
    bio,
    skills,
    currentJobDetails,
  } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          name,
          username,
          location,
          phone,
          linkedin,
          bio,
          skills,
          currentJobDetails,
        },
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User details updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User updation failed",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User details fetched",
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
        linkedin: user.linkedin,
        location: user.location,
        phone: user.phone,
        bio: user.bio,
        currentJobDetails: user.currentJobDetails,
        skills: user.skills,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "User data fetch failed",
    });
  }
};

module.exports = { getProfile, updateProfile };
