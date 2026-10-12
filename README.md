# Rick and Morty Explorer 🛸

אפליקציית Web מבוססת React + Vite בתצורת Master-Detail המציגה דמויות מתוך הסדרה "ריק ומורטי".

## תיאור

אפליקציה אינטראקטיבית שמאפשרת לחפש וצפות בדמויות מסדרת Rick and Morty. ממשק דו-עמודה עם רשימת חיפוש בצד שמאל ופאנל פרטים דינמי בצד ימין.

## התחלה מהירה

```bash
npm install
npm run dev
```

פתח את `http://localhost:5173` בדפדפן.

## API

האפליקציה משתמשת ב-[Rick and Morty API](https://rickandmortyapi.com/api/character):
```
GET https://rickandmortyapi.com/api/character
```

## הסבר על זרימת המידע וניהול ה-State

ה-state של הדמות שנבחרה (`selectedCharacter`) מנוהל ונשמר ברכיב האב הראשי `App`. 
בחרנו לשמור אותו שם מכיוון שזהו רכיב האב המשותף הקרוב ביותר ששני החלקים (רשימת הדמויות ופאנל הפרטים) זקוקים לו. 
כאשר המשתמש לוחץ על כרטיס של דמות ב-`CharacterCard`, מופעלת פונקציית callback שמועברת כלפי מעלה ומעדכנת את ה-state ב-`App`. 
ברגע שה-state משתנה, React מפעיל רינדור מחדש ומעביר את אובייקט הדמות שנבחרה למטה כ-prop בשם `character` ישירות לרכיב `CharacterDetail`. 
רכיב הפרטים מקבל את ה-prop לקריאה בלבד ומציג את הנתונים המלאים של הדמות שנבחרה (שם, תמונה, סטטוס, גזע ועולם מוצא).
