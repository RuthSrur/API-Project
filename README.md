# Rick and Morty Explorer 🛸

אפליקציית Web אינטראקטיבית בנויה ב-React + TypeScript המציגה דמויות מסדרת "ריק ומורטי" עם חיפוש, פרטים עמוקים, והטבעת מועדפים.

## מה האפליקציה עושה

- **עמוד כניסה** — דף ברוכים הבאים עם כפתור לעיון בדמויות
- **רשימת דמויות** — חיפוש בזמן אמת בשם הדמות בעמוד `/characters`
- **עמוד פרטים** — מידע מלא על כל דמות בנתיב `/characters/:id`, עם הטבעת מועדפים
- **מועדפים** — שמירת דמויות אהובות ב-localStorage בעמוד `/favorites`
- **עמוד 404** — הדרכה חזרה הביתה עבור דפים שלא קיימים

## הטכנולוגיה

- **React 19** — ממשק משתמש עם hooks (useState, useEffect, useParams)
- **TypeScript** — type safety חזק (`strict: true`)
- **Vite** — בנייה וקדם-עיבוד מהירים
- **React Router** — ניווט בין 5 עמודים עם NavLink ופעילות active state
- **Vitest** — בדיקות יחידה (unit tests) של פונקציות עזר
- **localStorage** — שמירה קבועה של מועדפים

## התחלה מהירה

### התקנה והפעלה

```bash
npm install
npm run dev
```

פתח את `http://localhost:5173` בדפדפן.

### בדיקות

```bash
# הרץ את כל הבדיקות
npm test

# פתח את Vitest UI (יישומון אינטראקטיבי לבדיקות)
npm run test:ui
```

### בנייה

```bash
npm run build
```

## API

האפליקציה משתמשת ב-[Rick and Morty API](https://rickandmortyapi.com/):

- **רשימת דמויות**: `GET https://rickandmortyapi.com/api/character`
- **דמות בודדת**: `GET https://rickandmortyapi.com/api/character/{id}`

כל קריאה כוללת טעינה ותיקייה מצב שגיאה.

## מבנה הפרויקט

```
src/
├── pages/              # 5 דפי ניווט
│   ├── Landing.tsx
│   ├── CharactersPage.tsx
│   ├── CharacterPage.tsx
│   ├── Favorites.tsx
│   └── NotFound.tsx
├── components/         # רכיבים משותפים
│   ├── CharacterCard.tsx
│   ├── CharacterList.tsx
│   ├── CharacterDetail.tsx
│   └── SearchBar.tsx
├── utils/              # פונקציות טהורות
│   ├── characters.ts
│   └── characters.test.ts
├── types.ts            # הגדרות TypeScript
├── App.tsx             # ניהול ה-state הראשי
└── App.css             # עיצוב גלובלי
```

## תכונות

- ✅ **Routing** — עמודים נפרדים עם NavLink ו-active styling
- ✅ **חיפוש** — filtering בזמן אמת, case-insensitive, עם trim
- ✅ **פרטים עם fetch** — כל דמות טוענת את הנתונים שלה בנפרד (`/characters/:id`)
- ✅ **מועדפים** — הטבעה/הסרה מ-localStorage בלחיצה
- ✅ **TypeScript** — typed props, state, event handlers
- ✅ **CSS Modules** — אנימציות fade-in, NavLink active state, responsive grid
- ✅ **Unit Tests** — בדיקות של פונקציות עזר (filtering, formatting)
- ✅ **Integration Tests** — בדיקות ניווט בין דפים וחיפוש

## הערות לפיתוח

- כל דמות נטענת בנפרד מה-API כש-URL ישירה לדמות נפתחת (reload תומך)
- מועדפים מתעדכנים ב-localStorage בכל עדכון
- הממשק תומך בעברית וערבית (RTL) בעזרת `dir="rtl"`
- אין שימוש בספריות UI חיצוניות — CSS טהור בלבד
