export default function CharacterDetail({ character }) {
  if (!character) {
    return (
      <div className="character-detail">
        <p className="detail-placeholder">Select a character to view details</p>
      </div>
    )
  }

  const episodeCount = character.episode?.length || 0
  const createdDate = character.created
    ? new Date(character.created).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : 'N/A'
  const locationName = character.location?.name || 'Unknown'

  return (
    <div className="character-detail">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin?.name || (typeof character.origin === 'string' ? character.origin : 'Unknown')}</p>
      <p><strong>📺 Episodes:</strong> {episodeCount} {episodeCount === 1 ? 'appearance' : 'appearances'}</p>
      <p><strong>📅 Created:</strong> {createdDate}</p>
      <p><strong>🌍 Location:</strong> {locationName}</p>
    </div>
  )
}
