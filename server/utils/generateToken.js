const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  if (!id) {
    console.log("Id not found");
  }

  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return token;
};

module.exports = generateToken;
