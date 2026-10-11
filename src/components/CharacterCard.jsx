export default function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
    </div>
  )
}
