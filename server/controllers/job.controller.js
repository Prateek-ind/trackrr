const Job = require("../models/job.model");

const createJob = async (req, res) => {
  const data = req.body;

  try {
    const job = await Job.create({ ...data, user: req.user.id });

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
      id,
      user: req.user._id,
    });

    if (!existingJob) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    const deletedJob = await Job.findByIdAndDelete(id);

    res.status(200).json({
      message: "Job deleted successfully",
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
