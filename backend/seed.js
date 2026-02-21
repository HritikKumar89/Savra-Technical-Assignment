
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./db/connect");

const activitySchema = new mongoose.Schema({
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
});

activitySchema.index(
  { teacher_id: 1, activity_type: 1, created_at: 1, subject: 1, class: 1 },
  { unique: true }
);

const Activity = mongoose.model("Activity", activitySchema);

//dummydata
const teachers = [
  { id: "T001", name: "Ashish" },
  { id: "T002", name: "Varun" },
  { id: "T003", name: "Neha" },
  { id: "T004", name: "Ritika" }
];

const subjects = ["Math", "Science", "English", "History"];
const classes = ["Grade 6", "Grade 7", "Grade 8"];
const activityTypes = ["lesson", "quiz", "assessment"];

const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const dummyData = [];

for (let i = 0; i < 100; i++) {
  const teacher = teachers[Math.floor(Math.random() * teachers.length)];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const cls = classes[Math.floor(Math.random() * classes.length)];
  const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];

  dummyData.push({
    teacher_id: teacher.id,
    teacher_name: teacher.name,
    activity_type: activity,
    subject,
    class: cls,
    created_at: randomDate(new Date(2026, 0, 1), new Date())
  });
}

const seedDB = async () => {
  try {
    await connectDB();
    await Activity.deleteMany({}); 
    await Activity.insertMany(dummyData);
    console.log("Dummy data inserted successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();