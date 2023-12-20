import React from 'react';

const Result = ({ score, questions }) => {
  const totalCorrectAnswers = questions.reduce(
    (total, question) => total + question.correct.length,
    0
  );

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <h2>Your Score: {score} / {totalCorrectAnswers}</h2>
      <button className="btn btn-primary" onClick={handleRefresh}>
        Restart
      </button>
    </div>
  );
};

export default Result;

