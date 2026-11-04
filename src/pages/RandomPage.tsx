import { useState, useEffect } from 'react'
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rollCount, setRollCount] = useState(0)

  useEffect(() => {
    if (rollCount === 0) return

    const randomId = getRandomCharacterId(MAX_CHARACTER_ID)

    fetch(`https://rickandmortyapi.com/api/character/${randomId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load random character')
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
  }, [rollCount])

  const handleRoll = () => {
    setLoading(true)
    setError(null)
    setRollCount(rollCount + 1)
  }

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
        {rollCount === 0 ? (
          <div className="random-intro">
            <p className="random-intro-text">Who will the portal bring you?</p>
            <button
              onClick={handleRoll}
              className="primary-button"
            >
              🎲 Roll a character
            </button>
          </div>
        ) : (
          <>
            {loading && <div className="portal-spinner"></div>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && character && (
              <>
                <div className="random-button-container">
                  <button
                    onClick={handleRoll}
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
              </>
            )}
          </>
        )}
      </div>
    </main>
  )
}
