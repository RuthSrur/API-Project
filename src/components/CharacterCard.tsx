import { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Character } from '../types'

interface CharacterCardProps {
  character: Character
  isFavorited: boolean
  onAddFavorite?: (character: Character) => void
  onRemoveFavorite?: (characterId: number) => void
}

export default function CharacterCard({
  character,
  isFavorited,
  onAddFavorite,
  onRemoveFavorite,
}: CharacterCardProps) {
  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorited && onRemoveFavorite) {
      onRemoveFavorite(character.id)
    } else if (onAddFavorite) {
      onAddFavorite(character)
    }
  }

  return (
    <Link to={`/characters/${character.id}`} className="character-card-link">
      <div className="character-card">
        <div className="card-image-wrapper">
          <img src={character.image} alt={character.name} />
          <button
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorited ? '♥️' : '🤍'}
          </button>
        </div>
        <h2>{character.name}</h2>
      </div>
    </Link>
  )
}
