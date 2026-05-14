const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "assessment", "offer", "rejected"],
      default: "applied",
      required: true,
    },
    salary: {
      type: Number,
    },
    link: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const jobModel = mongoose.model("jobModel", jobSchema)

module.exports = jobModel