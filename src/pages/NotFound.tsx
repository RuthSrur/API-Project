import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="app">
      <div className="landing-container">
        <h1 className="error-title">404</h1>
        <p className="landing-description">
          Page not found. This dimension doesn't exist!
        </p>
        <Link to="/" className="landing-button">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
