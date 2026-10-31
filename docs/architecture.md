# Architecture — Component Structure & Data Flow

## Component Tree

```
App.tsx (Root)
├── Navbar (NavLink navigation)
├── Routes
│   ├── Landing.tsx
│   ├── CharactersPage.tsx
│   │   └── CharacterList.tsx
│   │       └── CharacterCard.tsx (Link to /characters/:id)
│   │           ├── SearchBar.tsx (controlled input)
│   ├── CharacterPage.tsx
│   │   └── CharacterDetail.tsx (with favorite button)
│   ├── Favorites.tsx
│   │   └── CharacterList.tsx
│   │       └── CharacterCard.tsx
│   ├── StatsPage.tsx
│   │   └── StatCard.tsx (map over status/species counts)
│   └── NotFound.tsx
```

## State Management

### App.tsx (Top-Level State Owner)
Manages all application state:

```typescript
const [characters, setCharacters] = useState<Character[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [favorites, setFavorites] = useState<Character[]>(() => {
  // Initialize from localStorage
  const saved = localStorage.getItem('favorites')
  return saved ? JSON.parse(saved) : []
})
```

- **Characters & Loading/Error:** Fetched once on mount from `/api/character`
- **Favorites:** Synced to localStorage on every change via `useEffect`

### Page/Route Level State
- **CharacterPage:** Local `useState` for `character`, `loading`, `error` (fetches by ID on route param change)
- **CharactersPage:** Local `useState` for `searchTerm` (used with utility function to filter)

## Data Flow

### Downward (Props)
1. **App** passes `characters`, `loading`, `error`, `favorites`, `onAddFavorite`, `onRemoveFavorite` to pages
2. **CharactersPage** filters characters with utility function, passes filtered list to **CharacterList**
3. **CharacterList** maps over characters, passes each to **CharacterCard**
4. **CharacterCard** renders as a Link to `/characters/{id}`, with favorite button that calls callback

### Upward (Callbacks)
1. **CharacterCard** click on heart → calls `onAddFavorite(character)` or `onRemoveFavorite(characterId)`
2. **App** updates `favorites` state, triggers `useEffect` to sync to localStorage

### Sideways (Routing)
- **CharacterCard** wraps in `<Link to={...}>` so card clicks navigate
- **CharacterPage** uses `useParams()` to extract `id`, fetches independently from API

## Fetch Points

1. **App.tsx, useEffect on mount:**
   - `GET https://rickandmortyapi.com/api/character` → all characters
   - Stores in state, used for list and stats

2. **CharacterPage.tsx, useEffect on `id` param:**
   - `GET https://rickandmortyapi.com/api/character/{id}` → single character
   - Stores in local state, allows independent detail page load (supports direct URL access)

## Utility Functions

### Pure Functions (src/utils/characters.ts)
- `filterCharactersByName(characters, searchTerm)` — case-insensitive trim
- `formatCreatedDate(isoString)` → "Nov 2017" or "N/A"
- `formatEpisodeCount(episodes)` → "51 appearances"
- `getLocationName(character)` → "Unknown" if missing
- `isFavorite(favorites, id)` → boolean
- `toggleFavorite(favorites, character)` → updated array
- `countByStatus(characters)` → { Alive, Dead, unknown }
- `countBySpecies(characters)` → { [species]: count, ... }

All tested in `src/utils/characters.test.ts` (8 unit tests).

## CSS Architecture

- **App.css:** Single global stylesheet with:
  - Animations (`@keyframes fadeInUp`, `fadeIn`)
  - Component classes (`.character-card`, `.character-detail`, `.stat-card`, etc.)
  - Responsive breakpoints (`@media (max-width: 768px)`, `@media (max-width: 1024px)`)
  - NavLink active state (`.nav-link.active`)

## TypeScript

- **strict: true** in tsconfig.json
- All props typed with interfaces
- All state properly typed
- No `any` types
- Reusable Character and Location types in `src/types.ts`

## Testing

- **Unit Tests:** `src/utils/characters.test.ts` (8 tests of pure functions)
- **Integration Tests:** `src/__tests__/App.test.tsx` (2 tests of routing and search)
- **Total:** 10 tests via `npm test`

Run `npm run test:ui` for interactive Vitest UI dashboard.
