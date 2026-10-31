# Product Requirements Document (PRD) — Rick & Morty Explorer

## 1. One-Sentence Pitch

A fast, lightweight web app for Rick and Morty fans to explore characters, view detailed profiles, save favorites, and browse statistics.

## 2. Who It Is For

Fans of the animated show looking for an interactive reference guide to browse, search, and remember their favorite characters.

## 3. Screens

1. **Landing Page** (`/`) — Welcome screen with app title and "Browse Characters" button.
2. **Characters List** (`/characters`) — Responsive grid of character cards with search bar, filtered in real-time.
3. **Character Details** (`/characters/:id`) — Full character profile with info, image, favorite button, and back link.
4. **Favorites** (`/favorites`) — Grid of saved characters with option to remove or view details.
5. **Statistics** (`/stats`) — Overview showing total character count, breakdown by status (Alive/Dead/unknown), and top species.
6. **404 Page** (`*`) — Helpful error page with navigation back to home.

## 4. Must-Have Features

1. Navigate between 6 pages using NavLink with visual active state.
2. Browse characters from the Rick and Morty API with lazy loading per page.
3. Live search bar to filter characters by name (case-insensitive).
4. Click any character to view full details on a dedicated page that loads independently.
5. Add/remove characters to favorites, persisted in localStorage.
6. View statistics: total count, breakdown by status, and species distribution.
7. Robust error and loading states on all data-fetching pages.

## 5. Acceptance Criteria

### Landing Page
- **When I load the app,** I see the welcome title, description, and "Browse Characters" button.
- **When I click "Browse Characters,"** I navigate to `/characters`.

### Characters List
- **When I visit `/characters`,** I see a grid of character cards with images and names.
- **When I type in the search bar,** I see only characters whose names match (case-insensitive).
- **When I click a character card,** I navigate to `/characters/{id}`.
- **When I click the heart button,** the character is added to favorites (or removed if already favorited).

### Character Details
- **When I visit `/characters/{id}`,** I see the character's full profile (status, species, gender, origin, episodes, creation date, location).
- **When I refresh the page,** the character data is loaded correctly.
- **When I click the favorite button,** the character is toggled in/out of favorites.
- **When I click "Back to characters,"** I navigate back to `/characters`.

### Favorites
- **When I visit `/favorites`,** I see all characters I have added.
- **When I have no favorites,** I see a message: "No favorites yet. Add your favorite characters from Characters! ♥️"
- **When I click a favorite card,** I navigate to its detail page.
- **When I click the heart button,** the character is removed from favorites.

### Statistics
- **When I visit `/stats`,** I see total character count, counts by status, and counts by species sorted by frequency.
- **When loading or error occurs,** I see appropriate loading/error messages (same as character list).

### Navigation
- **When I navigate to any URL not defined above (e.g., `/invalid`),** I see a 404 page with a link back home.
- **When I click NavLink,** it shows active styling (darker background, underline) for the current page.

## 6. Data

### API Endpoints
- **Character List:** `GET https://rickandmortyapi.com/api/character`
- **Single Character:** `GET https://rickandmortyapi.com/api/character/{id}`

### Fields Used

**Character Card:**
- `id`, `name`, `image`

**Character Details:**
- `id`, `name`, `image`, `status`, `species`, `gender`, `origin` (object with `name`), `location` (object with `name`), `episode` (array for count), `created` (ISO string)

**Statistics:**
- `status` (for breakdown), `species` (for breakdown)

### Storage
- **Favorites:** Stored in `localStorage` under key `'favorites'`, persisted across page reloads.

## 7. Technical Architecture

See [docs/architecture.md](./docs/architecture.md) for component structure, state ownership, and data flow.
