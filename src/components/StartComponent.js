import React, { useState } from 'react';

const StartComponent = ({ onGenerateTest }) => {
  const [questionCount, setQuestionCount] = useState(50);

  const handleStartClick = () => {
    onGenerateTest(questionCount);
  }

  return (
    <div class="container mt-5 text-center">
      <p class="lead">Welcome to my AWS practice test. Select how many questions you want and press start.</p>
        <label htmlFor="questionCount" className="me-2 lead">Number of questions:</label>
        <select
          id="questionCount"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value))}
          className="form-select d-inline-block w-auto me-2"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      <button class="btn btn-primary" onClick={handleStartClick}>Start</button>
    </div>
  );
};

export default StartComponent;