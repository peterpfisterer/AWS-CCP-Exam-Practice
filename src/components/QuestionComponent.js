// Question.js
import React from 'react';

const Question = ({ questionObj, index, selectedAnswers, onAnswerChange, submitted, correctAnswers }) => {
  const isMultipleChoice = Array.isArray(correctAnswers);

  const handleChange = (optionKey) => {
    onAnswerChange(index, optionKey, isMultipleChoice);
  };

  const isCorrect = (optionKey) => {
    if (isMultipleChoice) {
      return correctAnswers.includes(optionKey);
    } else {
      return correctAnswers === optionKey;
    }
  };

  const isSelectedCorrect = (optionKey) => {
    if (isMultipleChoice) {
      return selectedAnswers.includes(optionKey) && correctAnswers.includes(optionKey);
    } else {
      return selectedAnswers === optionKey && correctAnswers === optionKey;
    }
  };

  const isSelectedIncorrect = (optionKey) => {
    if (isMultipleChoice) {
      return selectedAnswers.includes(optionKey) && !correctAnswers.includes(optionKey);
    } else {
      return selectedAnswers === optionKey && correctAnswers !== optionKey;
    }
  };

  return (
    <div className="my-5 py-2">
      <p>{questionObj.question}</p>
      {questionObj.options.map((option, idx) => {
        const optionKey = Object.keys(option)[0];
        let optionClass = '';

        if (submitted) {
          if (isSelectedCorrect(optionKey)) {
            optionClass = 'correct-answer'; // Correct and selected
          } else if (isSelectedIncorrect(optionKey)) {
            optionClass = 'incorrect-answer'; // Incorrect and selected
          } else if (isCorrect(optionKey)) {
            optionClass = 'correct-answer'; // Correct but not selected
          }
        }

        return (
          <div key={idx} className={`form-check ${optionClass}`}>
            {isMultipleChoice ? (
              <input
                type="checkbox"
                id={`${index}-${optionKey}`}
                name={`question-${index}`}
                value={optionKey}
                checked={selectedAnswers.includes(optionKey)}
                onChange={() => handleChange(optionKey)}
                disabled={submitted} // Disable input after submission
                className="form-check-input"
              />
            ) : (
              <input
                type="radio"
                id={`${index}-${optionKey}`}
                name={`question-${index}`}
                value={optionKey}
                checked={selectedAnswers === optionKey}
                onChange={() => handleChange(optionKey)}
                disabled={submitted} // Disable input after submission
                className="form-check-input"
              />
            )}
            <label htmlFor={`${index}-${optionKey}`} className="form-check-label">
              {`${optionKey}: ${option[optionKey]}`}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Question;
