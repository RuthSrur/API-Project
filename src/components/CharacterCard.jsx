export default function CharacterCard({ character, onSelectCharacter, isActive, isFavorited, onAddFavorite, onRemoveFavorite, isFavoritesPage }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if (isFavorited && onRemoveFavorite) {
      onRemoveFavorite(character.id)
    } else if (onAddFavorite) {
      onAddFavorite(character)
    }
  }

  return (
    <div className={`character-card ${isActive ? 'active' : ''}`} onClick={() => onSelectCharacter(character)}>
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
  )
}
