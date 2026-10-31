import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Character } from '../types'

interface CharacterPageProps {
  favorites: Character[]
  onAddFavorite: (character: Character) => void
  onRemoveFavorite: (characterId: number) => void
}

export default function CharacterPage({
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}: CharacterPageProps) {
  const { id } = useParams<{ id: string }>()
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('No character ID provided')
      setLoading(false)
      return
    }

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('Character not found')
          throw new Error('Failed to fetch character')
        }
        return res.json()
      })
      .then((data: Character) => {
        setCharacter(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleFavoriteClick = () => {
    if (!character) return
    const isFavorited = favorites.some(fav => fav.id === character.id)
    if (isFavorited) {
      onRemoveFavorite(character.id)
    } else {
      onAddFavorite(character)
    }
  }

  return (
    <main className="app">
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {loading && <p>טוען...</p>}
        {error && <p style={{ color: '#dc2626' }}>{error}</p>}
        {!loading && !error && character && (
          <>
            <Link to="/characters" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>
              ← Back to characters
            </Link>
            <div className="character-detail" style={{ position: 'relative', top: 'auto', marginTop: '20px' }}>
              <img src={character.image} alt={character.name} />
              <h2>{character.name}</h2>
              <p>
                <strong>Status:</strong> {character.status}
              </p>
              <p>
                <strong>Species:</strong> {character.species}
              </p>
              <p>
                <strong>Gender:</strong> {character.gender}
              </p>
              <p>
                <strong>Origin:</strong>{' '}
                {character.origin?.name ||
                  (typeof character.origin === 'string' ? character.origin : 'Unknown')}
              </p>
              <p>
                <strong>📺 Episodes:</strong> {character.episode?.length || 0}{' '}
                {(character.episode?.length || 0) === 1 ? 'appearance' : 'appearances'}
              </p>
              <p>
                <strong>📅 Created:</strong>{' '}
                {new Date(character.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
              </p>
              <p>
                <strong>🌍 Location:</strong> {character.location?.name || 'Unknown'}
              </p>
              <button
                onClick={handleFavoriteClick}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: favorites.some(fav => fav.id === character.id) ? '#fecaca' : '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)'
                  ;(e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.target as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {favorites.some(fav => fav.id === character.id) ? '♥️ Remove from favorites' : '🤍 Add to favorites'}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
