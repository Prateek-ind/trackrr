const express = require("express")
const router = express.Router()
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require("../controllers/job.controller")

router.get("/", getJobs)
router.get("/:id", getJobById)
router.post("/", createJob)
router.post("/:id", updateJob)
router.post("/:id", deleteJob)

module.exports = router