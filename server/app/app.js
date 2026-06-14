require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("../routes/auth.routes");
const jobRoutes = require("../routes/job.routes");
const resumeRoutes = require("../routes/resume.routes");
const activityRoutes = require("../routes/activity.route");
const userRoutes = require("../routes/user.route");
const protect = require("../middlewares/protect.middleware");

app.use(express.json());

app.use(cookieParser());
app.options(
  "(.*)",
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

const allowedOrigins = [
  "https://trackrr-red.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} | Origin: ${req.headers.origin}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "App started",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/resume", protect, resumeRoutes);

app.use("/api/activities", protect, activityRoutes);

app.use("/api/user", protect, userRoutes);

module.exports = app;
