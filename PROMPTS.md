# יומן פרומפטים

כל פרומפט שאתם שולחים לסוכן נרשם כאן **אוטומטית** (ראו `README.md`).
אחרי כל משימה, הוסיפו בעצמכם שורה אחת: מה בדקתם, ומה שיניתם בעצמכם.

<!-- הרשומות מתווספות מתחת לשורה הזאת -->

## 2026-10-11

**23:08 · claude**

> Please implement Task 1 ONLY:
> 1. Create a local mock JSON dataset file at `src/data/mockData.json` containing 4 Rick and Morty characters (with fields: id, name, image, status, species, gender, origin). Use working image URLs from the Rick and Morty API CDN (e.g., https://rickandmortyapi.com/api/character/avatar/1.jpeg).
> 2. Create two components:
>    - `src/components/CharacterCard.jsx`: receives a character and renders its image and name.
>    - `src/components/CharacterList.jsx`: receives the list of characters and renders them using `.map()` with character.id as the key.
> 3. In `src/App.jsx`, import and display `CharacterList` using the mock data.
> 
> Do NOT implement selection, details panel, API fetch, or search yet.
> Explain your changes in 3 plain sentences.

**23:19 · claude**

> <ide_opened_file>The user opened the file /Users/ruthsr/web-development/react-project-starter/PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> Please implement Task 2 ONLY:
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

**23:26 · claude**

> <ide_opened_file>The user opened the file /Users/ruthsr/web-development/react-project-starter/PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> Please update the following two documentation files:
> 
> 1. In `PROMPTS.md`:
> Under the Task 2 entry, ensure the "I checked:" line is added at the end:
> "I checked: Verified in the browser that clicking different character cards dynamically updates the details panel with the selected character's species, status, and origin, and confirmed the two-column master-detail layout renders properly."
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
