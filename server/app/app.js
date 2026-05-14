require("dotenv").config();

const express = require("express");
const authRoutes = require("../routes/auth.routes");
const jobRoutes = require("../routes/job.routes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "App started",
  });
});

app.use("/api/auth", authRoutes);

app.use("/job", jobRoutes)

module.exports = app;
