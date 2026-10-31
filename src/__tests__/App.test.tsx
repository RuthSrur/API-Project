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
      vi.fn((url: string) => {
        if (url.includes('/character/1')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCharacters[0]),
          })
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ results: mockCharacters }),
        })
      })
    )
  })

  it('filters characters by name when typing in search bar on characters page', async () => {
    const user = userEvent.setup()
    render(<App />)

    const allLinks = screen.getAllByRole('link')
    const charactersLink = allLinks.find(link => link.textContent === 'Characters')!
    await user.click(charactersLink)

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('חפש דמות...')
    await user.type(searchInput, 'Rick')

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument()
    expect(screen.queryByText('Summer Smith')).not.toBeInTheDocument()
  })

  it('navigates to character detail page when clicking a card', async () => {
    const user = userEvent.setup()
    render(<App />)

    const allLinks = screen.getAllByRole('link')
    const charactersLink = allLinks.find(link => link.textContent === 'Characters')!
    await user.click(charactersLink)

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    const cardLinks = screen.getAllByRole('link')
    const rickCardLink = cardLinks.find(link => link.textContent?.includes('Rick Sanchez'))!
    await user.click(rickCardLink)

    await waitFor(() => {
      expect(screen.getByText('Alive')).toBeInTheDocument()
    })
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to characters/ })).toBeInTheDocument()
  })
})
