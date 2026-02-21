import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

const WeeklyChart = ({ data }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h5 className="mb-3">Weekly Activity Trends</h5>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="lesson" stroke="#0d6efd" />
            <Line type="monotone" dataKey="quiz" stroke="#198754" />
            <Line type="monotone" dataKey="assessment" stroke="#ffc107" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;