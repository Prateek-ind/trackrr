const mongoose = require("mongoose");
const User = require("./user.model");
const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "applied",
        "interview",
        "assessment",
        "offer",
        "rejected",
        "deleted",
        "updated",
        "resume_created",
      ],
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: false,
    },
  },
  { timestamps: true },
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
