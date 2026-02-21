import React from "react";

const SummaryCards = ({ data }) => {
  const totals = data.reduce(
    (acc, teacher) => {
      acc.lessons += teacher.lessons;
      acc.quizzes += teacher.quizzes;
      acc.assessments += teacher.assessments;
      return acc;
    },
    { lessons: 0, quizzes: 0, assessments: 0 }
  );

  return (
    <div className="row mb-4">
      <Card title="Total Lessons" value={totals.lessons} color="primary" />
      <Card title="Total Quizzes" value={totals.quizzes} color="success" />
      <Card title="Total Assessments" value={totals.assessments} color="warning" />
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className="col-md-4 mb-3">
    <div className={`card text-white bg-${color} shadow`}>
      <div className="card-body">
        <h5>{title}</h5>
        <h2>{value}</h2>
      </div>
    </div>
  </div>
);

export default SummaryCards;