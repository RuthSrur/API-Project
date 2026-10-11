import { useState, useEffect } from 'react'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import SearchBar from './components/SearchBar'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch characters')
        return res.json()
      })
      .then(data => {
        setCharacters(data.results)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="app">
      <h1>Rick and Morty Characters</h1>
      {loading && <p>טוען דמויות...</p>}
      {error && <p>שגיאה בטעינת הנתונים, אנא נסה שוב</p>}
      {!loading && !error && (
        <>
          <div className="search-container">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          {filteredCharacters.length === 0 ? (
            <p className="no-results">לא נמצאו דמויות תואמות</p>
          ) : (
            <div className="main-content">
              <CharacterList characters={filteredCharacters} onSelectCharacter={setSelectedCharacter} selectedId={selectedCharacter?.id} />
              <CharacterDetail character={selectedCharacter} />
            </div>
          )}
        </>
      )}
    </main>
  )
}
