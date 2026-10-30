import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import { Character } from './types'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Character[]>(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch characters')
        return res.json()
      })
      .then((data: { results: Character[] }) => {
        setCharacters(data.results)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (character: Character) => {
    if (!favorites.find(fav => fav.id === character.id)) {
      setFavorites([...favorites, character])
    }
  }

  const removeFavorite = (characterId: number) => {
    setFavorites(favorites.filter(fav => fav.id !== characterId))
  }

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <nav className="navbar">
          <h1>Rick and Morty Explorer 🛸</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">
              Favorites ♥️ ({favorites.length})
            </Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                characters={characters}
                loading={loading}
                error={error}
                favorites={favorites}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onRemoveFavorite={removeFavorite}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
