import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="app">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '40px 20px',
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#dc2626' }}>
          404
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '40px' }}>
          Page not found. This dimension doesn't exist!
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
