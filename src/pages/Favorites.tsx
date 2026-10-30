import { useState } from 'react'
import CharacterList from '../components/CharacterList'
import CharacterDetail from '../components/CharacterDetail'
import { Character } from '../types'

interface FavoritesProps {
  favorites: Character[]
  onRemoveFavorite: (characterId: number) => void
}

export default function Favorites({ favorites, onRemoveFavorite }: FavoritesProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

  if (favorites.length === 0) {
    return (
      <main className="app">
        <p className="no-results">No favorites yet. Add your favorite characters from Home! ♥️</p>
      </main>
    )
  }

  return (
    <main className="app">
      <div className="search-container">
        <h2 style={{ margin: 0, fontSize: '18px', textAlign: 'center' }}>
          Your Favorite Characters ({favorites.length})
        </h2>
      </div>
      <div className="main-content">
        <CharacterList
          characters={favorites}
          onSelectCharacter={setSelectedCharacter}
          selectedId={selectedCharacter?.id}
          favorites={favorites}
          onRemoveFavorite={onRemoveFavorite}
          isFavoritesPage={true}
        />
        <CharacterDetail key={selectedCharacter?.id ?? 'empty'} character={selectedCharacter} />
      </div>
    </main>
  )
}
