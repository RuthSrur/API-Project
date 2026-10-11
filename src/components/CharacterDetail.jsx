export default function CharacterDetail({ character }) {
  if (!character) {
    return (
      <div className="character-detail">
        <p>Select a character to view details</p>
      </div>
    )
  }

  return (
    <div className="character-detail">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin?.name || (typeof character.origin === 'string' ? character.origin : 'Unknown')}</p>
    </div>
  )
}
