import axios from "axios";

const API = axios.create({
  baseURL: "https://savra-technical-assignment-1.onrender.com/api/insights/summary"
});

export const getSummary = () => API.get("/summary");

export const getWeekly = (teacherId) =>
  API.get(`/weekly${teacherId ? `?teacherId=${teacherId}` : ""}`);
