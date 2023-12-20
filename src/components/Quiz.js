import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import questions from './questions';
import 'bootstrap/dist/css/bootstrap.min.css';

const Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(3600); 

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  useEffect(() => {
    let timerInterval;

    if (quizStarted && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); 
    } else if (timer === 0) {
      clearInterval(timerInterval);
      handleFinishQuiz();
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [quizStarted, timer]);

  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleOptionChange = (index) => {
    const newSelectedOptions = [...selectedOptions];
    const optionIndex = newSelectedOptions.indexOf(index);

    if (optionIndex === -1) {
      newSelectedOptions.push(index);
    } else {
      newSelectedOptions.splice(optionIndex, 1);
    }

    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    const correctAnswers = shuffledQuestions[currentQuestion].correct;

    if (selectedOptions.length === 0) {
      alert('Please select an option before moving to the next question.');
      return;
    }

    const questionScore = selectedOptions.reduce((acc, selectedOption) => {
      if (correctAnswers.includes(selectedOption)) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(score + questionScore);
    setSelectedOptions([]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleFinishQuiz = () => {
    setCurrentQuestion(shuffledQuestions.length);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh', padding: '20px' }}>
        <div className="card w-100">
          <div className="card-body d-flex flex-column align-items-center justify-content-center">
            {!quizStarted ? (
              <button className="btn btn-primary" onClick={handleStartQuiz}>
                Start Quiz
              </button>
            ) : (
              <>
                {currentQuestion < shuffledQuestions.length ? (
                  <div className="row w-100">
                    <div className="col-md-6 text-center">
                      <h4>Question {currentQuestion + 1}/{shuffledQuestions.length}</h4>
                    </div>
                    <div className="col-md-6 text-center">
                      <h4>Topic: {shuffledQuestions[currentQuestion].topic}</h4>
                    </div>
                    <Question
                      id={shuffledQuestions[currentQuestion].id}
                      topic={shuffledQuestions[currentQuestion].topic}
                      question={shuffledQuestions[currentQuestion].question}
                      options={shuffledQuestions[currentQuestion].options}
                      selectedOptions={selectedOptions}
                      onChange={handleOptionChange}
                    />
                    <div className="col-md-12 text-center mt-3">
                      <h5>Time Remaining: {formatTime(timer)}</h5>
                    </div>
                  </div>
                ) : (
                  <Result score={score} questions={shuffledQuestions} />
                )}

                {currentQuestion < shuffledQuestions.length && (
                  <button className="btn btn-primary mt-3" onClick={handleNextQuestion}>Next Question</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;



