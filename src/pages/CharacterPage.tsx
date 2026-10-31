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

  const isFavorited = favorites.some(fav => fav.id === character?.id)

  return (
    <main className="app">
      <div className="character-page-container">
        {loading && <p>טוען...</p>}
        {error && <p style={{ color: '#dc2626' }}>{error}</p>}
        {!loading && !error && character && (
          <>
            <Link to="/characters" className="character-page-back-link">
              ← Back to characters
            </Link>
            <div className="character-detail character-page-detail">
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
                className={`character-page-button ${isFavorited ? 'favorited' : ''}`}
              >
                {isFavorited ? '♥️ Remove from favorites' : '🤍 Add to favorites'}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
