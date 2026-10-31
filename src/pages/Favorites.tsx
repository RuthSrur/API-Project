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
        <h2 className="page-title">
          Your Favorite Characters ({favorites.length})
        </h2>
      </div>
      <div className="list-page-container">
        <CharacterList
          characters={favorites}
          favorites={favorites}
          onRemoveFavorite={onRemoveFavorite}
        />
      </div>
    </main>
  )
}
