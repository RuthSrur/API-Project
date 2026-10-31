import CharacterList from '../components/CharacterList'
import { Character } from '../types'

interface FavoritesProps {
  favorites: Character[]
  onRemoveFavorite: (characterId: number) => void
}

export default function Favorites({ favorites, onRemoveFavorite }: FavoritesProps) {
  if (favorites.length === 0) {
    return (
      <main className="app">
        <p className="no-results">No favorites yet. Add your favorite characters from Characters! ♥️</p>
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
      <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <CharacterList
          characters={favorites}
          favorites={favorites}
          onRemoveFavorite={onRemoveFavorite}
        />
      </div>
    </main>
  )
}
