const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  console.log("middileware started");
  try {
    const token = req.cookies.token;

    console.log(req.cookies);

    if (!token) console.log("No token");

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

      console.log("decoding started");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log(decoded);

    const user = await User.findById(decoded.id).select("-password");

    console.log(user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = protect;
