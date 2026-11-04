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

    let isMounted = true

    const fetchCharacter = async () => {
      setLoading(true)
      setError(null)

      const randomId = getRandomCharacterId(MAX_CHARACTER_ID)

      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Character = await res.json()
        if (isMounted) setCharacter(data)
      } catch (err) {
        let errorMsg = 'Failed to fetch random character'
        if (err instanceof Error) errorMsg = err.message
        if (isMounted) setError(errorMsg)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCharacter()
    return () => { isMounted = false }
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
        {rollCount === 0 ? (
          <div className="random-intro">
            <p className="random-intro-text">Who will the portal bring you?</p>
            <button
              onClick={() => setRollCount(1)}
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
              </>
            )}
          </>
        )}
      </div>
    </main>
  )
}
