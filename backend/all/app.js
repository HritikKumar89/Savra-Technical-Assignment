const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();


const activitySchema = new mongoose.Schema(
  {
    teacher_id: { type: String, required: true },
    teacher_name: { type: String, required: true },
    activity_type: {
      type: String,
      enum: ["lesson", "quiz", "assessment"],
      required: true
    },
    subject: String,
    class: String,
    created_at: { type: Date, required: true }
  },
  { timestamps: true }
);


activitySchema.index(
  { teacher_id: 1, activity_type: 1, created_at: 1, subject: 1, class: 1 },
  { unique: true }
);

const Activity = mongoose.model("Activity", activitySchema);

//routes

router.post("/activity", async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ message: "Duplicate entry ignored" });
    }
    res.status(500).json({ error: err.message });
  }
});


router.get("/summary", async (req, res) => {
  try {
    const data = await Activity.aggregate([
      {
        $group: {
          _id: {
            teacher_id: "$teacher_id",
            teacher_name: "$teacher_name"
          },
          lessons: {
            $sum: { $cond: [{ $eq: ["$activity_type", "lesson"] }, 1, 0] }
          },
          quizzes: {
            $sum: { $cond: [{ $eq: ["$activity_type", "quiz"] }, 1, 0] }
          },
          assessments: {
            $sum: { $cond: [{ $eq: ["$activity_type", "assessment"] }, 1, 0] }
          }
        }
      },
      { $sort: { "_id.teacher_name": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/weekly", async (req, res) => {
  try {
    const { teacherId } = req.query;
    const match = teacherId ? { teacher_id: teacherId } : {};

    const data = await Activity.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            week: { $week: "$created_at" },
            activity_type: "$activity_type"
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.week": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;