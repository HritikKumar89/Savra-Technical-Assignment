import React, { useEffect, useState } from "react";
import { getSummary, getWeekly } from "../services/api";
import SummaryCards from "../components/SummaryCards";
import WeeklyChart from "../components/WeeklyChart";
import TeacherSelector from "../components/TeacherSelector";

const Dashboard = () => {
  const [summary, setSummary] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    fetchWeekly();
  }, [selectedTeacher]);

  const fetchSummary = async () => {
    const res = await getSummary();
    setSummary(res.data);
  };

  const fetchWeekly = async () => {
    const res = await getWeekly(selectedTeacher);
    const formatted = formatWeekly(res.data);
    setWeekly(formatted);
  };

  const formatWeekly = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const week = item._id.week;
      const type = item._id.activity_type;

      if (!grouped[week]) {
        grouped[week] = { week, lesson: 0, quiz: 0, assessment: 0 };
      }

      grouped[week][type] = item.count;
    });

    return Object.values(grouped);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">📊 Teacher Insights Dashboard</h2>

      <TeacherSelector
        teachers={summary}
        selected={selectedTeacher}
        setSelected={setSelectedTeacher}
      />

      <SummaryCards data={summary} />
      <WeeklyChart data={weekly} />
    </div>
  );
};

export default Dashboard;