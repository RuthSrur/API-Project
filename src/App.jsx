import CharacterList from './components/CharacterList'
import mockData from './data/mockData.json'

export default function App() {
  return (
    <main className="app">
      <h1>Rick and Morty Characters</h1>
      <CharacterList characters={mockData} />
    </main>
  )
}
