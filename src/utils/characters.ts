import { Character } from '../types'

export function filterCharactersByName(characters: Character[], searchTerm: string): Character[] {
  const trimmed = searchTerm.trim().toLowerCase()
  if (!trimmed) return characters
  return characters.filter(char => char.name.toLowerCase().includes(trimmed))
}

export function formatCreatedDate(isoString: string): string {
  if (!isoString) return 'N/A'
  try {
    const date = new Date(isoString)
    if (Number.isNaN(date.getTime())) return 'N/A'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  } catch {
    return 'N/A'
  }
}

export function formatEpisodeCount(episodes: string[] | undefined): string {
  const count = episodes?.length || 0
  return count === 1 ? '1 appearance' : `${count} appearances`
}

export function getLocationName(character: Character): string {
  return character.location?.name || 'Unknown'
}

export function isFavorite(favorites: Character[], id: number): boolean {
  return favorites.some(fav => fav.id === id)
}

export function toggleFavorite(favorites: Character[], character: Character): Character[] {
  if (isFavorite(favorites, character.id)) {
    return favorites.filter(fav => fav.id !== character.id)
  }
  return [...favorites, character]
}
