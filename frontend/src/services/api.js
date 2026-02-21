import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/insights"
});

export const getSummary = () => API.get("/summary");

export const getWeekly = (teacherId) =>
  API.get(`/weekly${teacherId ? `?teacherId=${teacherId}` : ""}`);