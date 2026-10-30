import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { Character } from '../types'

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    type: '',
    episode: [],
    url: '',
    created: '2017-11-04T19:22:43.665Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Smith Residence', url: '' },
    type: '',
    episode: [],
    url: '',
    created: '2017-11-04T19:22:43.665Z',
  },
  {
    id: 3,
    name: 'Summer Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Smith Residence', url: '' },
    type: '',
    episode: [],
    url: '',
    created: '2017-11-04T19:22:43.665Z',
  },
]

describe('App Component', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ results: mockCharacters }),
        })
      )
    )
  })

  it('filters characters by name when typing in search bar (PRD acceptance criterion)', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('חפש דמות...')
    await user.type(searchInput, 'Rick')

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument()
    expect(screen.queryByText('Summer Smith')).not.toBeInTheDocument()
  })

  it('displays character details when a card is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    const rickCard = screen.getAllByText('Rick Sanchez')[0]
    await user.click(rickCard)

    expect(screen.queryByText('Select a character to view details')).not.toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument()
  })
})
