import { formatCreatedDate, formatEpisodeCount, getLocationName } from '../utils/characters'
import { Character } from '../types'

interface CharacterDetailProps {
  character: Character | null
  onFavoriteClick?: () => void
  isFavorited?: boolean
  showFavoriteButton?: boolean
}

export default function CharacterDetail({
  character,
  onFavoriteClick,
  isFavorited = false,
  showFavoriteButton = false,
}: CharacterDetailProps) {
  if (!character) {
    return (
      <div className="character-detail">
        <p className="detail-placeholder">Select a character to view details</p>
      </div>
    )
  }

  const episodeCountText = formatEpisodeCount(character.episode)
  const createdDate = formatCreatedDate(character.created)
  const locationName = getLocationName(character)

  return (
    <div className="character-detail">
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
        <strong>📺 Episodes:</strong> {episodeCountText}
      </p>
      <p>
        <strong>📅 Created:</strong> {createdDate}
      </p>
      <p>
        <strong>🌍 Location:</strong> {locationName}
      </p>
      {showFavoriteButton && onFavoriteClick && (
        <button
          onClick={onFavoriteClick}
          className={`character-page-button ${isFavorited ? 'favorited' : ''}`}
        >
          {isFavorited ? '♥️ Remove from favorites' : '🤍 Add to favorites'}
        </button>
      )}
    </div>
  )
}
