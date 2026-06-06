const express = require("express");
const Activity = require("../models/activity.model");
const router = express.Router();

router.get("/", async(req, res)=>{
    try {
        const activities = await Activity.find({user: req.user.id}).sort({updatedAt: -1})
        res.status(200).json({
      message: "activities fetched successfully",
      activities
    });
    } catch (error) {
        res.status(500).json({
      message: error.message,
    });
    }
})

module.exports = router