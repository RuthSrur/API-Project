import { useState } from 'react'
import CharacterList from '../components/CharacterList'
import SearchBar from '../components/SearchBar'
import { Character } from '../types'

interface CharactersPageProps {
  characters: Character[]
  loading: boolean
  error: string | null
  favorites: Character[]
  onAddFavorite: (character: Character) => void
  onRemoveFavorite: (characterId: number) => void
}

export default function CharactersPage({
  characters,
  loading,
  error,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}: CharactersPageProps) {
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
            <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
              <CharacterList
                characters={filteredCharacters}
                favorites={favorites}
                onAddFavorite={onAddFavorite}
                onRemoveFavorite={onRemoveFavorite}
              />
            </div>
          )}
        </>
      )}
    </main>
  )
}
