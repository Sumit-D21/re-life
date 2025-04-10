"use client"
import React, { useState } from 'react';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Madrid', 'Paris', 'Berlin', 'Lisbon'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
    answer: 'Mars',
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
    answer: 'Harper Lee',
  },
];

const QuizPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizData[currentQ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    setUserAnswers([...userAnswers, isCorrect]);

    setSelectedOption(null);

    if (currentQ + 1 < quizData.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = userAnswers.filter(Boolean).length;

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow bg-white text-gray-900">
      {!showResult ? (
        <>
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
          <ul>
            {currentQuestion.options.map((opt, idx) => (
              <li key={idx} className="mb-2">
                <button
                  onClick={() => handleOptionSelect(opt)}
                  className={`w-full px-4 py-2 rounded border ${
                    selectedOption === opt ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleNext}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            {currentQ + 1 < quizData.length ? 'Next' : 'Finish'}
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>
          <p className="text-lg">You got {score} out of {quizData.length} correct!</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
