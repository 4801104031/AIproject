"use client"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X, CheckCircle, XCircle } from 'lucide-react'
import ResultCard from "./ResultCard";
import QuizzSubmission from "./QuizzSubmission"
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    questionText: "What is React",
    answers: [
      { answerText: "A library for building user interfaces", isCorrect: true, id: 1 },
      { answerText: "A frontend framework", isCorrect: false, id: 2 },
      { answerText: "A backend framework", isCorrect: false, id: 3 },
      { answerText: "A database", isCorrect: false, id: 4 }
    ]
  },
  {
    questionText: "What is JSX",
    answers: [
      { answerText: "A syntax extension for JavaScript", isCorrect: true, id: 1 },
      { answerText: "A new programming language", isCorrect: false, id: 2 },
      { answerText: "A database query language", isCorrect: false, id: 3 },
      { answerText: "A CSS framework", isCorrect: false, id: 4 }
    ]
  },
  {
    questionText: "What is a React component",
    answers: [
      { answerText: "A reusable piece of UI", isCorrect: true, id: 1 },
      { answerText: "A database table", isCorrect: false, id: 2 },
      { answerText: "A styling method", isCorrect: false, id: 3 },
      { answerText: "A testing framework", isCorrect: false, id: 4 }
    ]
  },
]

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    if (started && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleNext();
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, currentQuestion, submitted]);

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(30);
    } else {
      setSubmitted(true)
      return;
    }
    setSelectedAnswer(null);
    setIsCorrect(null);
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1)
    }
    setIsCorrect(isCurrentCorrect);
  }

  const scorePercentage: number = Math.round((score / questions.length) * 100)

  if (submitted) {
    return (
      <QuizzSubmission
        score={score}
        scorePercentage={scorePercentage}
        totalQuestions={questions.length}
      />
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-4 w-full">
        <header className="container mx-auto px-4 grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-4">
          <Button size="icon" variant="outline"><ChevronLeft /></Button>
          <ProgressBar value={(currentQuestion / questions.length) * 100} />
          <Button size="icon" variant="outline"><X /></Button>
        </header>
      </div>
      <main className="flex justify-center flex-1 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to the IT Quiz</h1>
              <p className="text-xl text-gray-600 mb-8">Test your knowledge of IT concepts and technologies!</p>
            </motion.div>
          ) : (
            <motion.div 
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-600">{questions[currentQuestion].questionText}</h2>
                <div className="text-2xl font-bold text-gray-600">{timeLeft}s</div>
              </div>
              <div className="grid grid-cols-1 gap-4 mt-6">
                {questions[currentQuestion].answers.map(answer => {
                  const variant = selectedAnswer === answer.id
                    ? (answer.isCorrect ? "neoSucess" : "neoDanger")
                    : "neoOutline"
                  return (
                    <Button
                      key={answer.id}
                      variant={variant}
                      size="xl"
                      onClick={() => handleAnswer(answer)}
                      className="w-full text-left justify-start relative overflow-hidden group"
                      disabled={selectedAnswer !== null}
                    >
                      <p className="whitespace-normal pr-8">{answer.answerText}</p>
                      {selectedAnswer === answer.id && (
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          {answer.isCorrect ? (
                            <CheckCircle className="text-green-500 w-6 h-6" />
                          ) : (
                            <XCircle className="text-red-500 w-6 h-6" />
                          )}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </Button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="sticky bottom-0 bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-6 px-4">
        <div className="container mx-auto max-w-2xl">
          <ResultCard
            isCorrect={isCorrect}
            correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText}
          />
          <Button
            variant="neo"
            size="lg"
            onClick={handleNext}
            className="w-full mt-4 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {!started ? 'Bắt đầu' : (currentQuestion === questions.length - 1) ? 'Nộp' : 'Tiếp tục'}
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>
        </div>
      </footer>
    </div>
  )
}

