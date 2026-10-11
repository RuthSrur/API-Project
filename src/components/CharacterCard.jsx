export default function CharacterCard({ character, onSelectCharacter, isActive }) {
  return (
    <div className={`character-card ${isActive ? 'active' : ''}`} onClick={() => onSelectCharacter(character)}>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
    </div>
  )
}
