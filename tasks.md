# Tasks

> עד 8 משימות, בסדר בנייה. כל משימה בגודל של commit אחד, ומסתיימת בשורת "Done when".

- [x] **1 · רשימה מקובץ מקומי** — רשימת דמויות מ-`src/data/mockData.json` עם כרטיסים קטנים.
      *Done when:* 4 דמויות נטענות בלי שגיאות בקונסול.
- [x] **2 · לחיצה מציגה פרטים** — state `selectedCharacter` ברכיב `App`, callback למטה.
      *Done when:* לחיצה על כרטיס מציגה פרטים מלאים בפאנל; לפני בחירה מוצגת הודעה.
- [x] **3 · fetch אמיתי** — החלפת mock data ב-API של Rick and Morty עם מצבי טעינה ושגיאה.
      *Done when:* נראה "טוען דמויות...", ובטעות API נראה הודעת שגיאה.
- [x] **4 · חיפוש** — SearchBar עם סינון בזמן אמת של שמות דמויות.
      *Done when:* הקלדה מחזירה תוצאות תואמות; חיפוש ריק מחזיר את כל הדמויות.
- [x] **5 · עיצוב Master-Detail** — layout 2-עמודות עם פאנל דמויות משמאל ופרטים מימין.
      *Done when:* העיצוב תואם להפניה ללא עודף white space, כרטיסים עם hover ו-active states.
- [x] **6 · ניקוי ודוקומנטציה** — ביקורת קוד, עדכון tasks.md ו-README.md.
      *Done when:* אין console.log, כל הkey-ים ייחודיים, README מסביר את הסדרה.
- [x] **7 · Routing עם React Router** — 5 עמודים: Landing (בית), Characters (רשימה עם חיפוש), Character/:id (פרטים), Favorites (מועדפים), NotFound (404). NavLink עם active styling, fetch by ID על הדף פרטים.
      *Done when:* כל הדפים נטענים, NavLink מציג active state, /characters/:id עובד עם refresh, כל הטסטים עוברים.