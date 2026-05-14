const express = require("express")
const router = express.Router()
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require("../controllers/job.controller")

router.get("/", getJobs)
router.get("/:id", getJobById)
router.post("/", createJob)
router.post("/edit/:id", updateJob)
router.post("/delete", deleteJob)

module.exports = router