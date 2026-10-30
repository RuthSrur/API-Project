import CharacterCard from './CharacterCard'
import { Character } from '../types'

interface CharacterListProps {
  characters: Character[]
  onSelectCharacter: (character: Character) => void
  selectedId?: number
  favorites: Character[]
  onAddFavorite?: (character: Character) => void
  onRemoveFavorite?: (characterId: number) => void
  isFavoritesPage?: boolean
}

export default function CharacterList({
  characters,
  onSelectCharacter,
  selectedId,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
  isFavoritesPage,
}: CharacterListProps) {
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
