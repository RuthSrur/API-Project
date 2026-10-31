import { useState } from 'react'
import CharacterList from '../components/CharacterList'
import SearchBar from '../components/SearchBar'
import { filterCharactersByName } from '../utils/characters'
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

  const filteredCharacters = filterCharactersByName(characters, searchTerm)

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
            <div className="list-page-container">
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
