require("dotenv").config();

const express = require("express");
const cors = require("cors")
const authRoutes = require("../routes/auth.routes");
const jobRoutes = require("../routes/job.routes");
const app = express();


app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,         
}))

app.get("/", (req, res) => {
  res.json({
    message: "App started",
  });
});

app.use("/api/auth", authRoutes);

app.use("api/job", jobRoutes)

module.exports = app;
