import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CharacterDetail from '../components/CharacterDetail'
import { getRandomCharacterId } from '../utils/characters'
import { isFavorite } from '../utils/characters'
import { Character } from '../types'

interface RandomPageProps {
  favorites: Character[]
  onAddFavorite: (character: Character) => void
  onRemoveFavorite: (characterId: number) => void
}

const MAX_CHARACTER_ID = 826

export default function RandomPage({
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}: RandomPageProps) {
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rollCount, setRollCount] = useState(0)

  useEffect(() => {
    const randomId = getRandomCharacterId(MAX_CHARACTER_ID)

    fetch(`https://rickandmortyapi.com/api/character/${randomId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load random character')
        return res.json()
      })
      .then((data: Character) => {
        setCharacter(data)
        setLoading(false)
        setError(null)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [rollCount])

  const handleFavoriteClick = () => {
    if (!character) return
    if (isFavorite(favorites, character.id)) {
      onRemoveFavorite(character.id)
    } else {
      onAddFavorite(character)
    }
  }

  return (
    <main className="app">
      <div className="character-page-container">
        {loading && <div className="portal-spinner"></div>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && character && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={() => setRollCount(rollCount + 1)}
                className="primary-button"
              >
                🎲 Roll again
              </button>
            </div>
            <div className="character-page-detail">
              <CharacterDetail
                key={character.id}
                character={character}
                onFavoriteClick={handleFavoriteClick}
                isFavorited={isFavorite(favorites, character.id)}
                showFavoriteButton
              />
            </div>
            <Link
              to={`/characters/${character.id}`}
              style={{ display: 'block', marginTop: '20px', textAlign: 'center', color: '#3b82f6' }}
            >
              View full page →
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
