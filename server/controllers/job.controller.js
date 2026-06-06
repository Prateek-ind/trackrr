const Job = require("../models/job.model");
const Activity = require("../models/activity.model");

const createJob = async (req, res) => {
  const data = req.body;

  try {
    const job = await Job.create({ ...data, user: req.user.id });

    await Activity.create({
      user: req.user.id,
      message: `You create a new Job for ${job.company} for ${job.role} role`,
      type: "applied",
      jobId: job._id,
    });
    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  const data = req.body;

  try {
    const jobs = await Job.find({ user: req.user.id });

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findOne({ _id: id, user: req.user.id });

    if (!job) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    res.status(201).json({
      message: "Job fetched by id successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const existingJob = await Job.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!existingJob) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (req.body.status && req.body.status !== existingJob.status) {
      await Activity.create({
        user: req.user.id,
        message: `Status updated to ${req.body.status} at ${existingJob.company}`,
        type: req.body.status,
        jobId: existingJob._id,
      });
    } else {
      const activity = await Activity.create({
        user: req.user.id,
        message: `You updated a Job for ${updatedJob.company} for ${updatedJob.role} role`,
        type: "updated",
        jobId: existingJob._id,
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const existingJob = await Job.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!existingJob) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    const deletedJob = await Job.findByIdAndDelete(id);

    await Activity.create({
      user: req.user.id,
      message: `Removed application for ${job.role} at ${job.company}`,
      type: "deleted",
    });

    res.status(200).json({
      message: "Job deleted successfully",
      activity,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
