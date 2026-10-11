import { useState, useEffect } from 'react'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCharacter, setSelectedCharacter] = useState(null)

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

  return (
    <main className="app">
      <h1>Rick and Morty Characters</h1>
      {loading && <p>טוען דמויות...</p>}
      {error && <p>שגיאה בטעינת הנתונים, אנא נסה שוב</p>}
      {!loading && !error && (
        <div>
          <CharacterList characters={characters} onSelectCharacter={setSelectedCharacter} selectedId={selectedCharacter?.id} />
          <CharacterDetail character={selectedCharacter} />
        </div>
      )}
    </main>
  )
}
