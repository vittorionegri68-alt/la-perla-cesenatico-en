# La Perla del Mare — Sito Web

## Setup rapido

```bash
npm install
npm run dev
```

## File da personalizzare

- `src/struttura.js` — tutti i dati della struttura (gia compilato)
- `src/posts.js` — articoli del blog (gia compilati con 4 articoli)
- `index.html` — meta tag SEO (gia compilato)

## Immagini da caricare

### Foto stanze → `src/assets/rooms/`
Carica questi file (nomi esatti):
- `Bagno1.jpg`
- `Bagno2.jpg`
- `Bagno3.jpg`
- `Balcone1.jpg`
- `Box1.jpg`
- `Cucina.jpg`
- `Esterno1.jpg`
- `Letto1.jpg`
- `Letto2.jpg`
- `Soggiorno.jpg`

### Poster → `src/assets/`
Carica questi file (solo quelli con _web nel nome):
- `Cesenatico_1_web.jpg`
- `Cesenatico_2_Web.jpg`
- `Cesenatico_4_Web.jpg`
- `Cesenatico_5_web.jpg`

### Poster Giro d'Italia → `public/`
- `Cervia_1.png`
- `Cervia_2.png`

## Dopo aver caricato le immagini

Aggiorna gli import in `App.jsx` — sezione IMMAGINI in cima al file:

```js
// Stanze
import room1 from "./assets/rooms/Bagno1.jpg";
import room2 from "./assets/rooms/Bagno2.jpg";
import room3 from "./assets/rooms/Balcone1.jpg";
import room4 from "./assets/rooms/Box1.jpg";
import room5 from "./assets/rooms/Cucina.jpg";
import room6 from "./assets/rooms/Esterno1.jpg";
import room7 from "./assets/rooms/Letto1.jpg";
import room8 from "./assets/rooms/Letto2.jpg";
import room9 from "./assets/rooms/Soggiorno.jpg";
import room10 from "./assets/rooms/Bagno3.jpg";

// Poster
import poster1 from "./assets/Cesenatico_1_web.jpg";
import poster2 from "./assets/Cesenatico_2_Web.jpg";
import poster3 from "./assets/Cesenatico_4_Web.jpg";
import poster4 from "./assets/Cesenatico_5_web.jpg";
```

## Deploy su Vercel

1. Crea repo GitHub `la-perla-cesenatico`
2. Carica tutti i file
3. Connetti a Vercel
4. URL: `La-Perla-Cesenatico.vercel.app`
