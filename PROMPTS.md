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
