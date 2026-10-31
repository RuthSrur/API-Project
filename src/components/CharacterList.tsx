import CharacterCard from './CharacterCard'
import { Character } from '../types'

interface CharacterListProps {
  characters: Character[]
  favorites: Character[]
  onAddFavorite?: (character: Character) => void
  onRemoveFavorite?: (characterId: number) => void
}

export default function CharacterList({
  characters,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}: CharacterListProps) {
  return (
    <div className="character-list">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          isFavorited={favorites?.some(fav => fav.id === character.id)}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
    </div>
  )
}
