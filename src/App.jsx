import { useState } from 'react'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import mockData from './data/mockData.json'
import './App.css'

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  return (
    <main className="app">
      <h1>Rick and Morty Characters</h1>
      <div>
        <CharacterList characters={mockData} onSelectCharacter={setSelectedCharacter} selectedId={selectedCharacter?.id} />
        <CharacterDetail character={selectedCharacter} />
      </div>
    </main>
  )
}
