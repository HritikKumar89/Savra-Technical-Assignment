require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/insights", require("./all/app"));

app.get("/", (req, res) => {
  res.send("Teacher Insights API Running 🚀");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);