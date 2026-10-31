import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className="app">
      <div className="landing-container">
        <h1 className="landing-title">Rick and Morty Explorer 🛸</h1>
        <p className="landing-description">
          Explore the infinite universe of Rick and Morty characters. Discover their stories, locations, and status across all dimensions.
        </p>
        <Link to="/characters" className="landing-button">
          Browse Characters
        </Link>
      </div>
    </main>
  )
}
