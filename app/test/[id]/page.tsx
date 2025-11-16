'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { testData } from '@/lib/questions'
import Link from 'next/link'

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const testId = parseInt(params.id as string)
  const test = testData[testId]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(test ? test.duration * 60 : 0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!test) {
      router.push('/')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [test, router])

  if (!test) {
    return null
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    })
  }

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    test.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / test.questions.length) * 100)

    return (
      <div className="container">
        <Link href="/" className="back-button">← Back to Home</Link>
        <div className="results-container">
          <h1>Test Completed!</h1>
          <div className="score-circle">
            <h2>{percentage}%</h2>
            <p>Your Score</p>
          </div>
          <div className="results-details">
            <div className="result-item">
              <h3>{score}</h3>
              <p>Correct</p>
            </div>
            <div className="result-item">
              <h3>{test.questions.length - score}</h3>
              <p>Incorrect</p>
            </div>
            <div className="result-item">
              <h3>{test.questions.length}</h3>
              <p>Total</p>
            </div>
          </div>

          <div className="review-section">
            <h3>Review Your Answers</h3>
            {test.questions.map((q, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === q.correctAnswer
              return (
                <div key={q.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <h4>Question {index + 1}: {q.question}</h4>
                  <p>
                    <strong>Your answer:</strong>{' '}
                    <span className={isCorrect ? 'correct-answer' : 'your-answer'}>
                      {userAnswer !== undefined ? q.options[userAnswer] : 'Not answered'}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      <strong>Correct answer:</strong>{' '}
                      <span className="correct-answer">{q.options[q.correctAnswer]}</span>
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <Link href="/">
            <button className="btn">Take Another Test</button>
          </Link>
        </div>
      </div>
    )
  }

  const question = test.questions[currentQuestion]

  return (
    <div className="container">
      <Link href="/" className="back-button">← Back to Home</Link>
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>{test.title}</h1>
          <div className="progress-info">
            <span style={{ color: '#667eea', fontWeight: 'bold' }}>
              Question {currentQuestion + 1} of {test.questions.length}
            </span>
            <div className="timer">{formatTime(timeLeft)}</div>
          </div>
        </div>

        <div className="question-section">
          <div className="question-number">QUESTION {currentQuestion + 1}</div>
          <h2 className="question-text">{question.question}</h2>

          <div className="options">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
              >
                {String.fromCharCode(65 + index)}. {option}
              </div>
            ))}
          </div>
        </div>

        <div className="navigation">
          <button
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          {currentQuestion === test.questions.length - 1 ? (
            <button className="btn" onClick={handleSubmit}>
              Submit Test
            </button>
          ) : (
            <button className="btn" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
