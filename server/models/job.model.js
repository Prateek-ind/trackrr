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
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "assessment", "offer", "rejected"],
      default: "applied",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    source: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    attachments: [
      {
        name: {
          type: String,
          trim: true,
        },
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
