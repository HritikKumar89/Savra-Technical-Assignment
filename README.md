# Teacher Insights Dashboard

## Overview
This project is a Teacher Insights Dashboard for school administrators.  
It shows teacher performance, activity trends, and allows per-teacher analysis.  
Built with MERN stack (MongoDB, Express, React, Node.js) and Bootstrap.

## GitHub Repository
https://github.com/HritikKumar89/Savre-Technical-Assignment.git

## Features
- View total lessons, quizzes, and assessments per teacher
- Weekly activity trends visualized in charts
- Duplicate entries handled gracefully
- Responsive UI using Bootstrap

 ## Architecture Decisions
- Backend: Node.js + Express.js 
- Database: MongoDB (local) storing `activities` collection with a compound unique index to prevent duplicates
- Frontend: React with Bootstrap for styling and Recharts for charts
- Data flow: Frontend calls `/api/insights/summary` and `/api/insights/weekly` to fetch aggregated data
- Folder structure: Simplified to two main folders in backend: `db` for connection, `all` for routes and models

 ## Future Scalability Improvements
- Authentication: Add admin login and role-based access
- Pagination & Filtering: Handle large datasets efficiently
- Deployment: Use environment-specific config for backend/frontend
- Logging & Monitoring: Add logging and error tracking for production

## How to Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/ritik123/teacher-insights.git
   cd Assignment1
