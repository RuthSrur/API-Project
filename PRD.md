# Product Requirements Document (PRD) — Rick & Morty Explorer

## 1. One-Sentence Pitch
A fast, lightweight web app for Rick and Morty fans to explore characters, their origins, and current statuses.

## 2. Who It Is For
Fans of the animated show looking for a simple reference guide to characters and their appearances.

## 3. Screens
- **Character List (Master):** A responsive grid displaying character cards with their portrait, name, and status.
- **Character Details (Detail):** A dedicated sticky side panel showing comprehensive information for the selected character, including origin planet, current location, species, and gender.

## 4. Must-Have Features
1. Browse a list of Rick and Morty characters loaded from the public API.
2. Select any character card to view their full details in the side panel.
3. Live search bar to filter characters by name in real-time.
4. Robust network state management (Loading indicator and user-friendly Error state).
5. Responsive Master-Detail layout.

## 5. Acceptance Criteria
- When I load the app, I see character cards with their images and names.
- When I click on a character card (e.g., "Rick Sanchez"), I see their full details and origin planet in the details panel.
- When I type "Morty" in the search box, I see only characters whose names include "Morty".
- When data is being fetched, I see a clear "Loading..." indicator.
- When the API request fails, I see a user-friendly error message.

## 6. Not Now
- Pagination / infinite scrolling beyond the initial page.
- Favorites and bookmarks stored in localStorage.
- Dark mode toggle.
- Multi-page routing with React Router.

## 7. Data
- **API Endpoint:** https://rickandmortyapi.com/api/character
- **Fields Used:**
  - Card: `id`, `name`, `image`, `status`
  - Details: `name`, `image`, `status`, `species`, `gender`, `origin.name`, `location.name`