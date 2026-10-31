import { Link } from 'react-router-dom'

export default function Landing() {
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
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Rick and Morty Explorer 🛸
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '40px', maxWidth: '500px' }}>
          Explore the infinite universe of Rick and Morty characters. Discover their stories, locations, and status across all dimensions.
        </p>
        <Link
          to="/characters"
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
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#1e40af'
            ;(e.target as HTMLElement).style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#3b82f6'
            ;(e.target as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          Browse Characters
        </Link>
      </div>
    </main>
  )
}
