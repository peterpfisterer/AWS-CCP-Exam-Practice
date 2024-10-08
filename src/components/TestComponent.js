// Test.js
import React, { useState } from 'react';
import Question from './QuestionComponent';

const Test = ({ questions, onRetry }) => {
  // State to store the user's answers
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false); // Track if the test is submitted
  const [score, setScore] = useState(null); // To hold the percentage of correct answers

  // Handle changes to the answers
  const handleChange = (questionIndex, option, isMultipleChoice) => {
    if (isMultipleChoice) {
      // For multiple choice questions
      setAnswers((prevAnswers) => {
        const currentAnswers = prevAnswers[questionIndex] || [];
        if (currentAnswers.includes(option)) {
          // If already selected, remove it
          return {
            ...prevAnswers,
            [questionIndex]: currentAnswers.filter((ans) => ans !== option),
          };
        } else {
          // Otherwise, add it
          return {
            ...prevAnswers,
            [questionIndex]: [...currentAnswers, option],
          };
        }
      });
    } else {
      // For single choice questions
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: option,
      }));
    }
  };

  const calculateScore = () => {
    let correctCount = 0;

    questions.forEach((questionObj, index) => {
      const correctAnswer = questionObj.answer;
      const userAnswer = answers[index];

      // Check for multiple-choice questions
      if (Array.isArray(correctAnswer)) {
        if (Array.isArray(userAnswer) && correctAnswer.length === userAnswer.length) {
          const sortedCorrectAnswer = [...correctAnswer].sort();
          const sortedUserAnswer = [...userAnswer].sort();

          if (JSON.stringify(sortedCorrectAnswer) === JSON.stringify(sortedUserAnswer)) {
            correctCount++;
          }
        }
      } else {
        // For single-answer questions
        if (userAnswer === correctAnswer) {
          correctCount++;
        }
      }
    });

    const totalQuestions = questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    setScore(percentage.toFixed(2)); // Save score as a percentage with two decimal places
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true); // Mark the test as submitted
    calculateScore(); // Calculate the score
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const handleRetry = () => {
    onRetry(); // Call the retry function passed from the parent component
  };

  return (
    <div class="container my-5">
      {submitted && score !== null && score >= 70 &&(
        <div className="alert alert-success">
          You answered {score}% of the questions correctly. This is a passing score.
        </div>
      )}

      {submitted && score !== null && score < 70 &&(
        <div className="alert alert-danger">
          You answered {score}% of the questions correctly. This is not a passing score.
        </div>
      )}
      {submitted &&(
        <button onClick={handleRetry} className="btn btn-primary">Retry</button>
      )}

      <form onSubmit={handleSubmit}>
        {questions.map((questionObj, index) => (
          <Question
            key={index}
            questionObj={questionObj}
            index={index}
            selectedAnswers={Array.isArray(questionObj.answer) ? (answers[index] || []) : answers[index] || ""} // Correctly handle single vs multiple choice
            onAnswerChange={handleChange} // Pass the change handler
            submitted={submitted} // Pass submission status
            correctAnswers={questionObj.answer} // Pass the correct answers
          />
        ))}
        {!submitted &&(
          <button type="submit" className="btn btn-primary">Submit Answers</button>
        )}
      </form>
    </div>
  );
};

export default Test;
