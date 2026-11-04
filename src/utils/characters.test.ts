import { describe, it, expect } from 'vitest'
import {
  filterCharactersByName,
  formatCreatedDate,
  formatEpisodeCount,
  toggleFavorite,
  getRandomCharacterId,
  getCharacterIds,
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
    episode: Array.from({ length: 51 }, (_, i) => `${i + 1}`),
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
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Dead',
    species: 'Human',
    gender: 'Female',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Smith Residence', url: '' },
    image: '',
    episode: ['1'],
    url: '',
    type: '',
    created: '2017-11-04T22:31:02.271Z',
  },
]

describe('filterCharactersByName', () => {
  it('matches characters regardless of upper/lower case', () => {
    const result = filterCharactersByName(mockCharacters, 'RICK')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Rick Sanchez')
  })

  it('returns all characters when search is empty', () => {
    const result = filterCharactersByName(mockCharacters, '')
    expect(result).toHaveLength(3)
  })
})

describe('formatCreatedDate', () => {
  it('returns "Nov 2017" for a valid date', () => {
    const result = formatCreatedDate('2017-11-04T19:22:43.665Z')
    expect(result).toBe('Nov 2017')
  })

  it('returns "N/A" for an invalid date', () => {
    const result = formatCreatedDate('invalid-date')
    expect(result).toBe('N/A')
  })
})

describe('formatEpisodeCount', () => {
  it('returns "51 appearances" for 51 episodes', () => {
    const result = formatEpisodeCount(mockCharacters[0].episode)
    expect(result).toBe('51 appearances')
  })
})

describe('toggleFavorite', () => {
  it('adds a character that is missing', () => {
    const result = toggleFavorite([], mockCharacters[0])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('removes a character that is already there', () => {
    const result = toggleFavorite([mockCharacters[0]], mockCharacters[0])
    expect(result).toHaveLength(0)
  })
})

describe('getRandomCharacterId', () => {
  it('returns whole numbers between 1 and maxId', () => {
    const maxId = 826
    for (let i = 0; i < 100; i++) {
      const id = getRandomCharacterId(maxId)
      expect(Number.isInteger(id)).toBe(true)
      expect(id).toBeGreaterThanOrEqual(1)
      expect(id).toBeLessThanOrEqual(maxId)
    }
  })
})

describe('getCharacterIds', () => {
  it('returns comma-separated string of ids from 1 to count', () => {
    const result = getCharacterIds(5)
    expect(result).toBe('1,2,3,4,5')
  })

  it('returns correct format for 60 characters', () => {
    const result = getCharacterIds(60)
    const ids = result.split(',').map(Number)
    expect(ids).toHaveLength(60)
    expect(ids[0]).toBe(1)
    expect(ids[59]).toBe(60)
  })
})
