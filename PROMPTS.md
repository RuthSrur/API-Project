# יומן פרומפטים

כל פרומפט שאתם שולחים לסוכן נרשם כאן **אוטומטית** (ראו `README.md`).
אחרי כל משימה, הוסיפו בעצמכם שורה אחת: מה בדקתם, ומה שיניתם בעצמכם.

<!-- הרשומות מתווספות מתחת לשורה הזאת -->

## 2026-10-11

**23:08 · claude**

> 1. Create a local mock JSON dataset file at `src/data/mockData.json` containing 4 Rick and Morty characters (with fields: id, name, image, status, species, gender, origin). Use working image URLs from the Rick and Morty API CDN (e.g., https://rickandmortyapi.com/api/character/avatar/1.jpeg).
> 2. Create two components:
>    - `src/components/CharacterCard.jsx`: receives a character and renders its image and name.
>    - `src/components/CharacterList.jsx`: receives the list of characters and renders them using `.map()` with character.id as the key.
> 3. In `src/App.jsx`, import and display `CharacterList` using the mock data.
> 
> Do NOT implement selection, details panel, API fetch, or search yet.
> Explain your changes in 3 plain sentences.

I checked: Verified all 4 characters load from mockData.json, confirmed CharacterList renders them as a grid, and confirmed each card displays image and name correctly.

**23:19 · claude**

> 1. Create `src/components/CharacterDetail.jsx` which receives a `character` prop:
>    - If `character` is null, show a friendly placeholder: "Select a character to view details".
>    - If a character is selected, display their full details: image, name, status, species, gender, and origin planet.
> 2. In `src/App.jsx`, add state: `const [selectedCharacter, setSelectedCharacter] = useState(null);`.
> 3. Pass a callback function down through `CharacterList` to `CharacterCard` so clicking any card updates `selectedCharacter`.
> 4. Render `<CharacterDetail character={selectedCharacter} />` in `App.jsx` alongside the list.
> 
> Do NOT add API fetching or search yet.
> Explain your changes in 3 plain sentences.

I checked: Verified in the browser that clicking different character cards dynamically updates the details panel with the selected character's species, status, and origin, and confirmed the two-column master-detail layout renders properly.

**23:23 · claude**

> Please refine the styling in `src/App.css` to create a proper Master-Detail layout:
> 
> 1. Layout structure:
>    - Create a container layout using flex or grid with 2 columns:
>      - Left column: The character list grid (small, compact cards).
>      - Right column: A sticky details panel with a nice card design, so it stays visible while browsing.
> 2. Character Cards:
>    - Compact cards with max-width (around 140px-160px).
>    - Images constrained to 120px width/height with object-fit: cover and rounded corners.
>    - `cursor: pointer;` on hover with a smooth hover shadow/lift effect so it feels completely clickable.
>    - Distinct active/highlight border or background when a card is selected.
> 3. Details Panel:
>    - Card container with padding, background color, subtle border/shadow.
>    - Large avatar image (around 200px) and clean typography for name, status, species, and origin.
>    - If empty, center the placeholder text nicely.
> 
> Keep plain CSS, no third-party libraries.

## Task 2 — click an item to show its details
I checked: Clicked on character cards and confirmed that the details view updates dynamically with the selected character's status, species, and origin.
> 
> 2. In `README.md`:
> Append the following explanation section at the end of the file in Hebrew:
> 
> ## הסבר על זרימת המידע וניהול ה-State (משימות 1–2)
> ה-state של הדמות שנבחרה (`selectedCharacter`) מנוהל ונשמר ברכיב האב הראשי `App`. 
> בחרנו לשמור אותו שם מכיוון שזהו רכיב האב המשותף הקרוב ביותר ששני החלקים (רשימת הדמויות ופאנל הפרטים) זקוקים לו. 
> כאשר המשתמש לוחץ על כרטיס של דמות ב-`CharacterCard`, מופעלת פונקציית callback שמועברת כלפי מעלה ומעדכנת את ה-state ב-`App`. 
> ברגע שה-state משתנה, React מפעיל רינדור מחדש ומעביר את אובייקט הדמות שנבחרה למטה כ-prop בשם `character` ישירות לרכיב `CharacterDetail`. 
> רכיב הפרטים מקבל את ה-prop לקריאה בלבד ומציג את הנתונים המלאים של הדמות שנבחרה (שם, תמונה, סטטוס, גזע ועולם מוצא).

**23:35 · claude**

> 1. In `src/App.jsx`, replace the imported mock data with a real `fetch()` call inside a `useEffect` hook to:
>    `https://rickandmortyapi.com/api/character`
> 2. Add state management for:
>    - `characters`: array of characters initialized as empty `[]`.
>    - `loading`: boolean initialized as `true`.
>    - `error`: string/null initialized as `null`.
> 3. Handle the 3 UI states cleanly:
>    - When loading: display a user-friendly loading indicator (e.g. "טוען דמויות...").
>    - When error: display an error message (e.g. "שגיאה בטעינת הנתונים, אנא נסה שוב").
>    - When success: render the character list and details panel as before.
> 4. Keep the selection logic intact (`onSelectCharacter` and `selectedCharacter`).
> 
> Do NOT implement search yet.
> Explain what you changed in 3 plain sentences.

I checked: Verified API fetch works with `useEffect` hook, confirmed loading and error states display correctly, and tested that character selection still works with live data from the Rick and Morty API.

**23:38 · claude**

> Fix the React crash error: "Objects are not valid as a React child (found: object with keys {name, url})".
> 
> In `src/components/CharacterDetail.jsx`:
> 1. Find where `character.origin` or `character.location` are rendered.
> 2. The Rick and Morty API returns `origin` and `location` as objects: `{ name: string, url: string }`.
> 3. Update the JSX to render their `.name` property safely instead of the whole object:
>    - For Origin: `{character.origin?.name || (typeof character.origin === 'string' ? character.origin : 'Unknown')}`
>    - For Location: `{character.location?.name || 'Unknown'}`
> 4. Ensure no raw object is directly embedded as a React child anywhere in this component.

I checked: Replaced mock data with live Rick and Morty API. Fixed a React child object crash on `character.origin.name`. Verified in DevTools console that characters load dynamically and selection works cleanly with no runtime errors.

**23:43 · claude**

> 1. Create a `src/components/SearchBar.jsx` component containing a styled text input with placeholder "חפש דמות...".
> 2. In `src/App.jsx`, create a search term state: `const [searchTerm, setSearchTerm] = useState('');`.
> 3. Filter the `characters` array based on `searchTerm` (case-insensitive search by character name) before passing the filtered list down to `CharacterList`.
> 4. If no characters match the search term, display a friendly message: "לא נמצאו דמויות תואמות".
> 5. Render `<SearchBar value={searchTerm} onChange={setSearchTerm} />` above the character list.
> 
> Do NOT alter existing detail selection or API logic.
> Report your changes in 3 plain sentences.

I checked: Created SearchBar component with Hebrew placeholder, tested real-time filtering by character name (case-insensitive), and confirmed "no results" message appears when search yields no matches.

**23:47 · claude**

> <ide_opened_file>The user opened the file /Users/ruthsr/web-development/react-project-starter/PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> Please fix the UI layout and search bar styling in `src/App.css` (Task 5):
> 
> 1. Overall Layout:
>    - Center the application container on the page with `max-width: 1100px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif;`.
>    - Title: Centered at the top with clean spacing.
>    
> 2. Search Bar:
>    - Place the search input centered below the main title.
>    - Constrain its width: `max-width: 450px; width: 100%; margin: 0 auto 24px auto; display: block;`.
>    - Add clean padding (10px 16px), subtle border, border-radius (8px), and box-shadow.
> 
> 3. Master-Detail Container:
>    - Create a clean 2-column layout:
>      `display: grid; grid-template-columns: 320px 1fr; gap: 24px; align-items: start;`
>    - Left column (Character List):
>      - Scrollable vertical list or 2-column grid within its container (`max-height: 75vh; overflow-y: auto; padding-right: 8px;`).
>      - Compact character cards with image, name, and status badge.
>      - Highlight selected card with an active border or accent color.
>    - Right column (Character Detail):
>      - A sticky card (`position: sticky; top: 20px;`) with nice padding, subtle background/border, large character portrait, and detailed fields.
> 
> Ensure everything fits neatly on the screen without massive overflowing white areas.

I checked: Reviewed code to verify no unused imports, confirmed all list items have unique `character.id` keys, and verified error handling in API fetch works cleanly without console errors.

## 2026-10-12

**18:06 · claude**

> 1. Review `src/App.jsx`, `src/components/`, and `src/App.css`:
>    - Clean up any unused imports or console.log statements.
>    - Verify all list items have unique `key` props (`character.id`).
>    - Ensure clean error handling if the API fetch fails.
> 2. Update `tasks.md` to mark all completed tasks (Tasks 1 through 6) as [x] done.
> 3. Update `README.md` to make sure it includes:
>    - App title and description (Rick and Morty Master-Detail app).
>    - How to run the app (`npm install`, `npm run dev`).
>    - The live API endpoint used.
>    - The 5 Hebrew sentences explaining state and data flow.
> 
> Explain your final polish changes in 3 plain sentences.

I checked: Updated tasks.md to mark all 6 tasks complete, improved README.md with app description and API endpoint info, and verified PRD.md has all acceptance criteria clearly defined.


**18:26 · claude**

> ## Bonus: React Router + Favorites Feature
> 
> ### מה לעשות:
> 1. **התקנת React Router**
>    - `npm install react-router-dom`
> 
> 2. **ניתוב (Routing)**
>    - Create two pages:
>      - **Home** (`/`): הרשימה + הפרטים (המצב הנוכחי)
>      - **Favorites** (`/favorites`): רשימת המועדפים בלבד
>    - Add navigation: 2 links בעמוד (Home, Favorites)
> 
> 3. **Favorites Functionality**
>    - Add a "♥️ Add to Favorites" button in CharacterCard
>    - Store favorites in App state (or localStorage for persistence)
>    - On Favorites page: show only favorites, allow remove from favorites
>    - If no favorites: show a friendly message "No favorites yet"
> 
> 4. **State Management**
>    - Keep favorites array in App.jsx (or localStorage)
>    - Pass favorites + addFavorite/removeFavorite callbacks down
> 
> ### Acceptance Criteria:
> - When I click "Home" link, I see the character list and search
> - When I click a heart icon on a card, the character is added to favorites
> - When I click "Favorites" link, I see only characters I favorited
> - When I remove a character from favorites, it disappears from the Favorites page
> - Navigation between Home and Favorites works without errors
> - Favorites persist if using localStorage
> 
> ### Do NOT:
> - Add Redux or state management library
> - Over-engineer the favorites feature
> - Delete the existing list/detail functionality
> 
> ### Explain your changes in 3 plain sentences.

I checked: Installed react-router-dom and created Home/Favorites pages with proper routing, added heart button to CharacterCard for adding/removing favorites, and tested localStorage persistence—favorites survive page refresh.

**18:29 · claude**

> Please fix the UI layout and styling in `src/App.css` and the layout wrapper components:
> 
> 1. Navigation Bar:
>    - Create a clean header spanning 100% width: `display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.08); margin-bottom: 24px;`.
>    - Title/Logo on one side, navigation links (`Home`, `Favorites`) on the other side with neat spacing and hover effects.
> 
> 2. Search Bar:
>    - Centered container below navbar: `max-width: 500px; margin: 0 auto 30px auto; width: 100%; display: flex; justify-content: center;`.
>    - Input: full width inside its container, `padding: 12px 20px; border-radius: 9999px; border: 1px solid #d1d5db; box-shadow: 0 2px 4px rgba(0,0,0,0.05);`.
> 
> 3. Main Content (Two Columns Master-Detail):
>    - Wrap the main view in a container: `max-width: 1200px; margin: 0 auto; padding: 0 20px; display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start;`.
>    - Left Column (Character List):
>      - Display as a multi-column responsive grid: `display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 18px; max-height: calc(100vh - 200px); overflow-y: auto; padding-right: 8px;`.
>      - Cards: `background: #ffffff; border-radius: 12px; padding: 12px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.06); cursor: pointer; position: relative;`.
>      - Card images: `width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;`.
>      - Favorite button/icon: positioned nicely at top-right corner of card.
>    - Right Column (Character Detail Panel):
>      - Sticky panel: `position: sticky; top: 24px; background: #ffffff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center;`.
>      - Detail image: `width: 100%; max-height: 260px; object-fit: cover; border-radius: 12px; margin-bottom: 16px;`.
>      - Placeholder when empty: centered with padding and clear instructions.
> 
> Ensure no single-column squeezed list or horizontal overflow.

I checked: Verified navbar spans 100% width with title and nav-links properly spaced, confirmed search input is centered and responsive, and tested 2-column grid layout displays correctly with no horizontal overflow on different screen sizes.

**18:31 · claude**

> the layout looks bad , please fix it

I checked: Fixed grid layout to properly display 2 columns (character list left, details panel right), corrected navbar spacing with title on left and nav-links on right, and verified layout renders without single-column squeezing.

**18:33 · claude**

> i can see the favorites not saved when refreshing the page

I checked: Fixed localStorage initialization by using useState initializer function instead of useEffect, verified favorites are saved to localStorage on every change, and confirmed favorites persist across page refreshes.


**19:41 · claude**

> Please implement the testing bonus requirement using Vitest and React Testing Library:
> 
> 1. Setup & Configuration:
>    - Check if Vitest, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` are installed. If not, provide the exact install command or configure `vite.config.js` to enable `test: { globals: true, environment: 'jsdom', setupFiles: './src/setupTests.js' }`.
>    - Create `src/setupTests.js` (or `.ts`) with `@testing-library/jest-dom`.
> 
> 2. Write 2 unit/integration tests in `src/__tests__/App.test.jsx`:
>    - Test 1 (Acceptance line from PRD): Verify that the search input correctly filters characters. When typing "Rick", only character cards containing "Rick" remain visible in the document.
>    - Test 2 (Detail selection flow): Verify that clicking a character card renders their details (name, status, origin) in the details panel instead of the placeholder text.
> 
> 3. Update `package.json`:
>    - Add `"test": "vitest run"` under scripts.
> 
> Keep the tests minimal, robust, and mock the fetch API or data appropriately so `npm test` runs green. Explain how to run the test in 3 plain sentences.

I checked: Ran `npm test` in the terminal and verified that both test suites passed green.


**19:55 · claude**

> Please enhance the character details panel (`src/components/CharacterDetail.jsx`) by adding the following 3 fields:
> 
> 1. Episode Count (📺):
>    - Calculate how many episodes the character appears in using `character.episode?.length || 0`.
>    - Display it clearly (e.g., "Appears in: X episodes" or "מספר פרקים: X").
> 
> 2. First Appearance / Creation Date (📅):
>    - Format the `character.created` ISO string into a readable format (e.g., using `new Date(character.created).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })`).
>    - Display it as "Added to database / Created: Nov 2017". If unavailable, show "N/A".
> 
> 3. Character Location Link (🌍):
>    - Display the current location name (`character.location?.name || 'Unknown'`).
>    - If `character.location?.url` exists, render the location name as a clickable link (`<a href={character.location.url} target="_blank" rel="noreferrer">...</a>`) or a styled button. If no URL is provided, display plain text.
> 
> Ensure all new fields handle null/undefined safely to prevent runtime crashes, and add clean spacing/icons in `src/App.css` so they match the existing card styling.
> Explain your changes in 3 plain sentences.

**19:57 · claude**

> <task-notification>
> <summary>Commit security review found: XSS (javascript: URI in href) in src/components/CharacterDetail.jsx</summary>
> </task-notification>
> <system-reminder>
> Background security review of commit — address or acknowledge the findings below, then continue with the user's original request or continue waiting for their reply: ⚠ claude.ai connectors are disabled because ANTHROPIC_API_KEY or another auth source is set and takes precedence over your claude.ai login · Unset it to load your organization's connectors
> ⚠ claude.ai connectors are disabled because ANTHROPIC_API_KEY or another auth source is set and takes precedence over your claude.ai login · Unset it to load your organization's connectors
> ⚠ claude.ai connectors are disabled because ANTHROPIC_API_KEY or another auth source is set and takes precedence over your claude.ai login · Unset it to load your organization's connectors
> 
> </system-reminder>
I checked: the location links

**20:03 · claude**


> In `src/components/CharacterDetail.jsx`, do not make the location a clickable hyperlink to the raw API JSON endpoint. 
> Instead, render the location name as styled plain text with an icon:
> `Location: {character.location?.name || 'Unknown'}`
> Keep the episode count and created date as they are.

**20:25 · claude**

> After adding a character to the favorites, when clicking again on the heart button it dosent remove the character from favorites

I checked: clicking the heart on a character in Favorites deselects it.


## 2026-10-13

**23:49 · claude**
> 
> 1. Card Entrance Animation:
>    - Add a subtle fade-in and slight slide-up animation (`@keyframes fadeInUp`) to `.character-card` when the list renders.
>    - Keep the duration short and smooth (around 0.25s–0.3s ease-out).
> 
> 2. Interactive Micro-interactions:
>    - Enhance the `.character-card:hover` transition with a smooth scale/lift effect (`transform: translateY(-4px); transition: transform 0.2s ease, box-shadow 0.2s ease;`).
>    - Add an active/click press effect (`:active { transform: scale(0.98); }`).
> 
> 3. Detail Panel Transition:
>    - When a new character is selected, add a smooth fade-in effect to the `.character-detail` content (`@keyframes fadeIn`) so changes feel fluid rather than abrupt.
> 
> 4. Accessibility:
>    - Include a `@media (prefers-reduced-motion: reduce)` block that disables or simplifies animations for users sensitive to motion.
> 
> Do NOT install any external libraries. Explain what you added in 3 plain sentences.

## 2026-10-30

**11:25 · claude**

> <ide_opened_file>The user opened the file /Users/ruthsr/web-development/react-project-starter/PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> Remove the `.a5c/` folder from the Git repository and prevent it from being committed again.
> 
> 1. Add `.a5c/` to `.gitignore`, under a short comment explaining it is a local Claude plugin cache.
> 2. Untrack it with `git rm -r --cached .a5c`. Do not delete the folder from my disk.
> 3. Do NOT touch `PROMPTS.md`, `scripts/`, `.claude/`, `.codex/`, `.gemini/`, or `.agents/`. They are required for prompt logging.
> 4. Run `git status` and show me what will be committed before committing.
> 5. Commit with the message: "chore: stop tracking .a5c plugin cache".
> 6. Push to origin main.
> 
> Explain what you changed in 2 plain sentences.

**11:33 · claude**

> <ide_opened_file>The user opened the file /Users/ruthsr/web-development/react-project-starter/PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> The fadeIn animation on `.character-detail` only plays on first load, not when switching between characters, because React reuses the same DOM element.
> 
> Fix it by adding `key={selectedCharacter?.id ?? 'empty'}` to `<CharacterDetail />` in both `src/pages/Home.jsx` and `src/pages/Favorites.jsx`, so the panel remounts and the animation replays on every selection.
> 
> Do not change App.css. Commit with the message "fix: replay detail fade-in when switching characters". Explain the fix in 2 plain sentences.

**11:42 · claude**

> I want to migrate this project from JavaScript to TypeScript. This is an explicit request, and it overrides the "no TypeScript" rule in AGENTS.md.
> 
> First, show me a short plan and wait for my approval before changing anything.
> 
> After I approve:
> 
> 1. Update AGENTS.md: change the scope line so it allows TypeScript instead of forbidding it. Do not change any other rule.
> 2. Install `typescript` as a dev dependency. This is the only new package. `@types/react` and `@types/react-dom` are already installed.
> 3. Add a `tsconfig.json` suited to Vite + React with `strict: true`, and add `"typecheck": "tsc --noEmit"` to the scripts in package.json.
> 4. Rename the files:
>    - `src/main.jsx`, `src/App.jsx`, and everything in `src/components/` and `src/pages/` → `.tsx`
>    - `src/__tests__/App.test.jsx` → `.tsx`
>    - `src/setupTests.js` → `.ts`
>    - `vite.config.js` → `vite.config.ts`
>    Update `index.html` to point to `/src/main.tsx`, and update `setupFiles` in the Vite config.
> 5. Create `src/types.ts` with a `Character` interface that matches the fields we use from the Rick and Morty API (id, name, status, species, image, episode, created, location, etc.).
> 6. Add proper types to every component's props, to useState, and to the event handlers. Do not use `any`.
> 7. Do NOT change any behavior, styling, or CSS. Do NOT touch PROMPTS.md, scripts/, .claude/, .codex/, .gemini/, or .agents/.
> 8. Run `npm run typecheck`, `npm test`, and `npm run build`, and fix any errors until all three pass.
> 
> At the end, list the files that changed and explain the migration in 3 plain sentences. Do not commit; I will commit after I check.

**11:45 · claude**

> yes

**11:54 · claude**

> <ide_opened_file>The user opened the file /Users/ruthsr/web-development/react-project-starter/PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> The migration left duplicate files. Please clean up:
> 
> 1. Delete the old JavaScript files that now have TypeScript versions: `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/setupTests.js`, `src/__tests__/App.test.jsx`, all `.jsx` files in `src/components/` and `src/pages/`.
> 2. Delete `vitest.config.ts`. Keep the test settings only in `vite.config.ts`. Add `/// <reference types="vitest/config" />` at the top of `vite.config.ts` if it is needed for types.
> 3. Delete `src/test.d.ts`. In `src/setupTests.ts`, change the import to `import '@testing-library/jest-dom/vitest'` and remove unused imports.
> 4. Do not touch PROMPTS.md or any other file.
> 5. Run `npm run typecheck`, `npm test`, and `npm run build`. All three must pass.
> 
> Show me the final `git status` and do not commit.

## 2026-10-31

**18:11 · claude**

> <ide_opened_file>The user opened the file /Users/ruthsr/web-development/react-project-starter/PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> Update the routing to meet this course requirement:
> "Routing with React Router: a list page, a details page with its own URL (/items/:id), and at least two more pages. A navigation menu between pages using Link or NavLink."
> 
> This is a big change, so first show me a short plan and wait for my approval.
> 
> Target routes:
> - `/` → new `Landing` page: a short welcome title, one sentence about the app, and a "Browse characters" button (a Link to `/characters`).
> - `/characters` → the current list page with search (move what is in `Home` today here and rename it to `CharactersPage`).
> - `/characters/:id` → new `CharacterPage` details page.
> - `/favorites` → the existing Favorites page.
> - `*` → new `NotFound` page with a Link back home.
> 
> Requirements:
> 1. Navigation menu: use `NavLink` (not `Link`) for Home, Characters, and Favorites, and give the active link an `active` style in App.css. Keep the favorites count.
> 2. Details page:
>    - Read the id with `useParams`.
>    - Fetch the character from `https://rickandmortyapi.com/api/character/{id}`, so the page works on refresh or when the URL is opened directly.
>    - Show a loading state and an error state. If the character doesn't exist, show a "Character not found" message.
>    - Show all the details we show today (image, status, species, episode count, created date, location) and a favorite button.
>    - Add a "← Back to characters" Link.
> 3. List page: clicking a card navigates to `/characters/:id`. Remove the side detail panel from the list page and from Favorites, because the details page replaces it. Clicking the heart button on a card must toggle the favorite only, without navigating (stop the click from reaching the card).
> 4. Favorites page: cards link to `/characters/:id` as well.
> 5. Keep the existing fade-in animation on the details page, and keep everything typed with TypeScript (no `any`).
> 6. Each page goes in `src/pages/`, one component per file.
> 7. Update `tasks.md`: fill in task 7 with this routing work and a "Done when" line.
> 8. Update the existing tests if they break, and add one test showing that `/characters/1` renders the details page.
> 9. Do not touch PROMPTS.md, scripts/, .claude/, .codex/, .gemini/, or .agents/.
> 10. Run `npm run typecheck`, `npm test`, and `npm run build`. All three must pass.
> 
> At the end, list the changed files and explain what changed in 3 plain sentences. Do not commit.

**18:14 · claude**

> yes
