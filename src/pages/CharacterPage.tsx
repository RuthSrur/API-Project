import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import CharacterDetail from '../components/CharacterDetail'
import { isFavorite } from '../utils/characters'
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
    if (isFavorite(favorites, character.id)) {
      onRemoveFavorite(character.id)
    } else {
      onAddFavorite(character)
    }
  }

  return (
    <main className="app">
      <div className="character-page-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && character && (
          <>
            <Link to="/characters" className="character-page-back-link">
              ← Back to characters
            </Link>
            <div className="character-page-detail">
              <CharacterDetail
                character={character}
                onFavoriteClick={handleFavoriteClick}
                isFavorited={isFavorite(favorites, character.id)}
                showFavoriteButton
              />
            </div>
          </>
        )}
      </div>
    </main>
  )
}
