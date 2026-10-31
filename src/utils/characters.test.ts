import { describe, it, expect } from 'vitest'
import {
  filterCharactersByName,
  formatCreatedDate,
  formatEpisodeCount,
  getLocationName,
  isFavorite,
  toggleFavorite,
} from './characters'
import { Character } from '../types'

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: '',
    episode: ['1', '2', '3'],
    url: '',
    type: '',
    created: '2017-11-04T19:22:43.665Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Smith Residence', url: '' },
    image: '',
    episode: ['1', '2'],
    url: '',
    type: '',
    created: '2017-11-04T22:31:02.271Z',
  },
]

describe('filterCharactersByName', () => {
  it('filters characters by name case-insensitive', () => {
    const result = filterCharactersByName(mockCharacters, 'rick')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Rick Sanchez')
  })

  it('returns all characters when search term is empty', () => {
    const result = filterCharactersByName(mockCharacters, '')
    expect(result).toHaveLength(2)
  })

  it('returns all characters when search term is only whitespace', () => {
    const result = filterCharactersByName(mockCharacters, '   ')
    expect(result).toHaveLength(2)
  })

  it('returns empty array when no match is found', () => {
    const result = filterCharactersByName(mockCharacters, 'nonexistent')
    expect(result).toHaveLength(0)
  })

  it('finds partial matches', () => {
    const result = filterCharactersByName(mockCharacters, 'Smith')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Morty Smith')
  })
})

describe('formatCreatedDate', () => {
  it('formats valid ISO date string', () => {
    const result = formatCreatedDate('2017-11-04T19:22:43.665Z')
    expect(result).toBe('Nov 2017')
  })

  it('returns N/A for empty string', () => {
    const result = formatCreatedDate('')
    expect(result).toBe('N/A')
  })

  it('returns N/A for invalid date', () => {
    const result = formatCreatedDate('invalid-date')
    expect(result).toBe('N/A')
  })

  it('returns N/A for null-like values', () => {
    const result = formatCreatedDate('')
    expect(result).toBe('N/A')
  })
})

describe('formatEpisodeCount', () => {
  it('formats single episode as singular', () => {
    const result = formatEpisodeCount(['1'])
    expect(result).toBe('1 appearance')
  })

  it('formats multiple episodes as plural', () => {
    const result = formatEpisodeCount(['1', '2', '3'])
    expect(result).toBe('3 appearances')
  })

  it('returns "0 appearances" for empty array', () => {
    const result = formatEpisodeCount([])
    expect(result).toBe('0 appearances')
  })

  it('returns "0 appearances" for undefined', () => {
    const result = formatEpisodeCount(undefined)
    expect(result).toBe('0 appearances')
  })
})

describe('getLocationName', () => {
  it('returns location name from character', () => {
    const result = getLocationName(mockCharacters[0])
    expect(result).toBe('Citadel of Ricks')
  })

  it('returns Unknown when location name is empty', () => {
    const character = { ...mockCharacters[0], location: { name: '', url: '' } }
    const result = getLocationName(character)
    expect(result).toBe('Unknown')
  })
})

describe('isFavorite', () => {
  it('returns true when character is in favorites', () => {
    const result = isFavorite([mockCharacters[0]], 1)
    expect(result).toBe(true)
  })

  it('returns false when character is not in favorites', () => {
    const result = isFavorite([mockCharacters[0]], 2)
    expect(result).toBe(false)
  })

  it('returns false for empty favorites array', () => {
    const result = isFavorite([], 1)
    expect(result).toBe(false)
  })
})

describe('toggleFavorite', () => {
  it('adds character to favorites when not present', () => {
    const result = toggleFavorite([], mockCharacters[0])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('removes character from favorites when already present', () => {
    const result = toggleFavorite([mockCharacters[0]], mockCharacters[0])
    expect(result).toHaveLength(0)
  })

  it('does not add duplicate when adding twice', () => {
    let favorites: Character[] = []
    favorites = toggleFavorite(favorites, mockCharacters[0])
    favorites = toggleFavorite(favorites, mockCharacters[0])
    expect(favorites).toHaveLength(0)
  })

  it('preserves other favorites when removing one', () => {
    const favorites = [mockCharacters[0], mockCharacters[1]]
    const result = toggleFavorite(favorites, mockCharacters[0])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })
})
