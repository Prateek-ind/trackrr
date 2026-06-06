const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect.middleware");
const {
  login,
  logout,
  register,
  restoreSession,
} = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/restoreSession", protect, restoreSession);

module.exports = router;
