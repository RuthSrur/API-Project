import { useState } from 'react'
import CharacterList from '../components/CharacterList'
import CharacterDetail from '../components/CharacterDetail'
import SearchBar from '../components/SearchBar'

export default function Home({ characters, loading, error, favorites, onAddFavorite }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="app">
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
              <CharacterList
                characters={filteredCharacters}
                onSelectCharacter={setSelectedCharacter}
                selectedId={selectedCharacter?.id}
                favorites={favorites}
                onAddFavorite={onAddFavorite}
              />
              <CharacterDetail character={selectedCharacter} />
            </div>
          )}
        </>
      )}
    </main>
  )
}
