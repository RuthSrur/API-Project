import { describe, it, expect } from 'vitest'
import {
  filterCharactersByName,
  formatCreatedDate,
  formatEpisodeCount,
  toggleFavorite,
  countByStatus,
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

describe('countByStatus', () => {
  it('returns { Alive: 2, Dead: 1 } for 2 Alive + 1 Dead', () => {
    const result = countByStatus(mockCharacters)
    expect(result.Alive).toBe(2)
    expect(result.Dead).toBe(1)
    expect(result.unknown).toBe(0)
  })
})
