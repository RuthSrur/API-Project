import CharacterCard from './CharacterCard'

export default function CharacterList({ characters, onSelectCharacter, selectedId, favorites, onAddFavorite, onRemoveFavorite, isFavoritesPage }) {
  return (
    <div className="character-list">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelectCharacter={onSelectCharacter}
          isActive={selectedId === character.id}
          isFavorited={favorites?.some(fav => fav.id === character.id)}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
          isFavoritesPage={isFavoritesPage}
        />
      ))}
    </div>
  )
}
