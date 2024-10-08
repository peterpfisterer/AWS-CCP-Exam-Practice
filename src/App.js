// App.js
import React, { useState } from 'react';
import StartComponent from './components/StartComponent';
import TestComponent from './components/TestComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import testData from './Data/questions.json'; // Import your JSON file here
import './App.css';

function App() {
  const [showTest, setShowTest] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleGenerateTest = (questionCount) => {
    const allQuestions = testData.questions; // Assuming your JSON has a "questions" array
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random()); // Shuffle the questions
    const selectedQuestions = shuffledQuestions.slice(0, questionCount); // Select the first 50 questions
    setQuestions(selectedQuestions); // Update state with selected questions
    setShowTest(true); // Show the test
  };

  const handleRetry = () => {
    setShowTest(false); // Hide the test
  }

  return (
    <div className="App">
      <HeaderComponent />
      <div class="content">
        {showTest ? (
          <TestComponent questions={questions} onRetry={ handleRetry } />
        ) : (
          <StartComponent onGenerateTest={ handleGenerateTest } />
        )}
      </div>
      
      <FooterComponent />
    </div>
  );
}

export default App;
