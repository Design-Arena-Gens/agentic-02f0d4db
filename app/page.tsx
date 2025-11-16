'use client'

import Link from 'next/link'

const mockTests = [
  {
    id: 1,
    title: 'General Knowledge Quiz',
    description: 'Test your knowledge on various topics including history, geography, science, and current affairs.',
    questions: 10,
    duration: 15,
    difficulty: 'Medium'
  },
  {
    id: 2,
    title: 'Programming Fundamentals',
    description: 'Assess your understanding of basic programming concepts, data structures, and algorithms.',
    questions: 15,
    duration: 20,
    difficulty: 'Medium'
  },
  {
    id: 3,
    title: 'Mathematics Challenge',
    description: 'Challenge yourself with arithmetic, algebra, geometry, and problem-solving questions.',
    questions: 12,
    duration: 18,
    difficulty: 'Hard'
  },
  {
    id: 4,
    title: 'Science & Technology',
    description: 'Explore questions on physics, chemistry, biology, and modern technology.',
    questions: 10,
    duration: 15,
    difficulty: 'Easy'
  }
]

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>MockTest System</h1>
        <p style={{ color: '#666' }}>Choose a test and start practicing</p>
      </header>

      <div className="home-page">
        {mockTests.map(test => (
          <div key={test.id} className="test-card">
            <h2>{test.title}</h2>
            <p>{test.description}</p>
            <div className="test-info">
              <span>📝 {test.questions} questions</span>
              <span>⏱️ {test.duration} mins</span>
              <span>📊 {test.difficulty}</span>
            </div>
            <Link href={`/test/${test.id}`}>
              <button className="btn">Start Test</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
