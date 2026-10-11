import CharacterCard from './CharacterCard'

export default function CharacterList({ characters, onSelectCharacter, selectedId }) {
  return (
    <div className="character-list">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelectCharacter={onSelectCharacter}
          isActive={selectedId === character.id}
        />
      ))}
    </div>
  )
}
