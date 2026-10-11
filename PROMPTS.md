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

**23:48 · claude**

> Please completely replace the contents of `src/App.css` and ensure clean component layout:
> 
> 1. Reset & Global:
> body {
>   margin: 0;
>   background-color: #f3f4f6;
>   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
>   color: #1f2937;
> }
> 
> .app {
>   max-width: 1200px;
>   margin: 0 auto;
>   padding: 24px 20px;
> }
> 
> .app h1 {
>   text-align: center;
>   margin-bottom: 16px;
>   color: #111827;
> }
> 
> 2. Search Bar styling:
> .search-container {
>   display: flex;
>   justify-content: center;
>   margin-bottom: 28px;
> }
> 
> .search-input {
>   width: 100%;
>   max-width: 480px;
>   padding: 12px 18px;
>   border-radius: 9999px;
>   border: 1px solid #d1d5db;
>   font-size: 15px;
>   outline: none;
>   background: #ffffff;
>   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
> }
> 
> .search-input:focus {
>   border-color: #3b82f6;
>   box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
> }
> 
> 3. Two-Column Master-Detail Layout:
> .main-content {
>   display: grid;
>   grid-template-columns: 1fr 380px;
>   gap: 28px;
>   align-items: start;
> }
> 
> 4. Character List & Cards (Left Column):
> .character-list {
>   display: grid;
>   grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
>   gap: 16px;
>   max-height: 80vh;
>   overflow-y: auto;
>   padding-right: 8px;
> }
> 
> .character-card {
>   background: #ffffff;
>   border-radius: 12px;
>   padding: 12px;
>   text-align: center;
>   cursor: pointer;
>   border: 2px solid transparent;
>   box-shadow: 0 2px 6px rgba(0,0,0,0.05);
>   transition: all 0.2s ease;
> }
> 
> .character-card:hover {
>   transform: translateY(-3px);
>   box-shadow: 0 6px 12px rgba(0,0,0,0.1);
> }
> 
> .character-card.active, .character-card.selected {
>   border-color: #3b82f6;
>   background-color: #eff6ff;
> }
> 
> .character-card img {
>   width: 100%;
>   height: 140px;
>   object-fit: cover;
>   border-radius: 8px;
>   margin-bottom: 8px;
> }
> 
> .character-card h3, .character-card h2 {
>   font-size: 15px;
>   margin: 4px 0;
>   white-space: nowrap;
>   overflow: hidden;
>   text-overflow: ellipsis;
> }
> 
> 5. Details Panel (Right Column):
> .character-detail {
>   position: sticky;
>   top: 24px;
>   background: #ffffff;
>   border-radius: 16px;
>   padding: 24px;
>   box-shadow: 0 4px 14px rgba(0,0,0,0.08);
>   text-align: center;
> }
> 
> .character-detail img {
>   width: 100%;
>   max-height: 260px;
>   object-fit: cover;
>   border-radius: 12px;
>   margin-bottom: 16px;
> }
> 
> .character-detail h2 {
>   margin: 0 0 12px 0;
>   font-size: 22px;
> }
> 
> .character-detail p {
>   margin: 8px 0;
>   font-size: 14px;
>   text-align: left;
>   border-bottom: 1px solid #f3f4f6;
>   padding-bottom: 6px;
> }
> 
> .detail-placeholder {
>   color: #6b7280;
>   padding: 60px 20px;
>   text-align: center;
>   font-size: 16px;
> }
> 
> Ensure `App.jsx` wraps `<SearchBar />` in
