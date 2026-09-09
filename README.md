# 🍳 CucinApp

> Il tuo ricettario personale moderno, offline-first e senza distrazioni. Salva, organizza e cucina le tue ricette con timer integrati, lista spesa automatica, ricalcolo porzioni e funzione svuotafrigo.

[![PWA](https://img.shields.io/badge/PWA-Ready-orange?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-blue?style=flat-square&logo=react)](https://react.dev/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deploy-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)

---

## 📌 Regole di Versionamento SemVer (Obbligatorie)

Questo progetto adotta uno schema di versionamento semantico incrementale (`MAJOR.MINOR.PATCH` - es. `1.2.0`):

* **`x.Y.0` (MINOR - Grosso Cambiamento / Nuove Funzionalità):**
  * Si incrementa ad ogni **grosso cambiamento** (es. da `1.1.0` a `1.2.0`): nuove feature strutturali, refactoring database, modifiche all'architettura PWA o al catalogo.
  * **Aggiornamento del README:** Ogni volta che si passa a una nuova versione `x.Y.0`, **questo file `README.md` DEVE essere aggiornato**, aggiungendo il relativo blocco nel [Registro Versioni](#-registro-versioni-changelog) con l'elenco delle novità.
* **`x.y.Z` (PATCH - Piccolo Cambiamento / Fix):**
  * Si incrementa per ogni **piccolo cambiamento** (es. da `1.2.0` a `1.2.1`): bugfix puntuali, rifiniture grafiche CSS, correzioni di dosi o testi.
* **`X.0.0` (MAJOR - Ristrutturazione Completa):**
  * Si incrementa solo in caso di riscrittura architetturale profonda o breaking changes complessive dell'app.

### 📋 Checklist per ogni rilascio di versione:
1. **Modificare `"version"` in [`package.json`](./package.json)**: `package.json` è l'**unica fonte di verità**. Il build tool di Vite propaga automaticamente la versione a:
   * Header dell'app ([`Navbar.jsx`](./src/components/Navbar.jsx))
   * Cache del Service Worker PWA (`cucinapp-cache-vX.Y.Z` in [`sw.js`](./public/sw.js))
   * Metadati di backup esportati ([`db.js`](./src/services/db.js))
2. *(Obbligatorio solo per `x.Y.0` o `X.0.0`)*: Aggiungere il nuovo blocco nel changelog in fondo a questo `README.md`.

---

## ✨ Funzionalità Principali

* 📱 **PWA Offline-First:** Installabile su smartphone (Android/iOS) e desktop direttamente dal browser. Funziona al 100% anche senza connessione internet grazie alla cache locale e al Service Worker.
* 📖 **Catalogo Ricette Predefinito (`defaultRecipes.js`):** Ricette base collaudate (tra cui opzioni senza glutine, risotti, dolci) sincronizzate automaticamente all'avvio dell'app.
* 🛡️ **Soft Delete:** Le ricette eliminate non vengono rimosse distruttivamente ma marcate come `isDeleted: true`. Questo impedisce al catalogo predefinito di "resuscitarle" al riavvio dell'app.
* 🔑 **ID con UUID Anti-Collisione:** Ogni ricetta creata dall'utente riceve un ID univoco composto da slug del titolo e UUID v4 (es. `recipe_pasta-al-pomodoro_8f93a1c2-...`), evitando qualsiasi sovrapposizione.
* ⏱️ **Timer di Cottura per Singolo Step:** Possibilità di avviare timer dedicati per ogni passaggio direttamente nella modalità cottura a schermo intero.
* 🧊 **Svuotafrigo Intelligente:** Seleziona gli ingredienti avanzati che hai in casa per scoprire subito cosa puoi cucinare.
* 🛒 **Lista della Spesa Intelligente:** Aggiungi ingredienti con un click dalle ricette, spunta gli elementi al supermercato o aggiungili manualmente.
* 💾 **Backup & Ripristino JSON:** Esporta e importa l'intero ricettario e la lista della spesa in formato JSON per non perdere mai nulla o trasferire i dati tra dispositivi.
* 🌓 **Tema Scuro / Chiaro:** Supporto completo per dark mode e light mode con persistenza delle preferenze.

---

## 🛠️ Stack Tecnologico

* **Frontend:** React 19, JavaScript (ES Modules).
* **Build Tool:** Vite 8.
* **Storage Locale:** IndexedDB tramite wrapper [`idb`](https://github.com/jakearchibald/idb).
* **PWA & Offline:** Web App Manifest + Service Worker nativo (`sw.js`).
* **Icone:** [Lucide React](https://lucide.dev/).
* **Styling:** CSS puro modulare e custom properties (senza Tailwind, massima leggerezza e controllo).
* **Hosting & CI/CD:** [Cloudflare Pages](https://pages.cloudflare.com/) collegato a GitHub con deploy automatico su ogni commit.

---

## 🚀 Guida Rapida di Sviluppo Locale

### 1. Prerequisiti
* [Node.js](https://nodejs.org/) (versione 18 o superiore raccomandata).
* `npm` (incluso con Node.js).

### 2. Installazione
```bash
git clone https://github.com/tuo-utente/CucinApp.git
cd CucinApp
npm install
```

### 3. Avvio in modalità sviluppo
```bash
npm run dev
```
Il terminale mostrerà l'indirizzo locale (es. `http://localhost:5173`) e l'indirizzo di rete per aprirlo direttamente dal telefono connesso allo stesso Wi-Fi.

### 4. Compilazione di produzione
```bash
npm run build
```
Genera la build statica ottimizzata nella cartella `dist/`.

### 5. Controllo qualità del codice (Linter)
```bash
npm run lint
```

---

## 🌐 Deploy su Cloudflare Pages

Il deploy è **completamente automatizzato via GitHub**:
1. Esegui il commit e il push delle modifiche sul branch `main`:
   ```bash
   git add .
   git commit -m "Descrizione modifiche"
   git push
   ```
2. Cloudflare Pages intercetta il push, avvia la build (`npm run build`) e pubblica la nuova versione globale in circa 20-30 secondi.
3. Al successivo avvio dell'app da smartphone o PC, il Service Worker aggiorna automaticamente l'applicazione.

---

## 📝 Registro Versioni (Changelog)

### [1.3.0] - 2026-09-10
* **Esperienza Mobile Nativa (TWA & Android):**
  * **Navigazione Gesti Android (Gesture Back Navigation):** Collegamento dello storico del browser (`popstate`) a tutte le schermate e modali (dettaglio ricetta, form creazione ricetta, modalità cucina a schermo intero, svuotafrigo, backup e tab spesa). Il tasto "Indietro" o lo swipe laterale di Android chiude le viste aperte e torna al ricettario senza chiudere l'app.
  * **Scorciatoie Rapide Icona Home (App Shortcuts):** Configurate scorciatoie nel `manifest.json` accessibili con tocco prolungato (long-press) sull'icona dell'app: *Nuova Ricetta*, *Lista della Spesa* e *Svuotafrigo*.
  * **Feedback Aptico & Vibrazione (Haptic Feedback):** Vibrazione fisica ritmica del dispositivo al termine del timer di cottura e micro-feedback tattile alla spunta dei passaggi e degli articoli nella lista della spesa.
  * **Supporto Safe Areas (Notch & Gesture Bar):** Configurato `viewport-fit=cover` e margini con `env(safe-area-inset-top)` ed `env(safe-area-inset-bottom)` per garantire spaziatura perfetta rispetto al foro fotocamera e alla barra gesti inferiore.
  * **Disattivazione Pull-To-Refresh:** Applicato `overscroll-behavior-y: none` per eliminare ricaricamenti accidentali durante lo scorrimento delle ricette.
* **Packaging APK & Cloudflare:**
  * Configurato `assetlinks.json` in `public/.well-known/` con l'impronta SHA-256 della firma crittografica per l'esecuzione dell'APK a schermo intero senza barra del browser.
  * Configurato `wrangler.json` per la distribuzione automatizzata su Cloudflare Workers con supporto SPA.

---

### [1.2.0] - 2026-09-10
* **Refactoring Catalogo Ricette:**
  * Ridenominato e ristrutturato `sampleRecipes.js` in `defaultRecipes.js`.
  * Aggiornate dosi, tempi e passaggi chiave del ricettario casalingo (riduzione vino per risotto, lega acqua-farina di riso e resa a 16 per arancini, lievitazione e idratazione dolci).
* **Architettura Database & Sicurezza:**
  * Implementato pattern **Soft Delete** (`isDeleted: true`): eliminando una ricetta predefinita, essa non viene più ripristinata dai cicli di sync successivi.
  * Aggiunto generatore di ID con **UUID v4 + slug del titolo** per tutte le nuove ricette create e gli elementi della spesa (zero collisioni).
* **Miglioramenti UX & Mobile Form:**
  * Risolto bug di overflow orizzontale della casella "Nome Ingrediente" su smartphone (`min-width: 0` e layout elastico).
  * Rimossa l'unità di misura di default (`'g'`) nei nuovi ingredienti, ora uniforme e vuota per tutti i campi.
  * Spostato il pulsante *"Aggiungi Passaggio"* direttamente sotto l'ultimo passaggio per evitare di dover scrollare fino in cima.
  * Pulizia Navbar: rimosso pulsante duplicato di Svuotafrigo su mobile e rimosso tasto superfluo "Installa App" per un header minimale.
* **PWA & Cache:**
  * Aggiornato Service Worker con cache invalidation `v1.2.0`.

---

### [1.1.0] - 2026-09-09
* **Ottimizzazioni PWA e Catalogo Iniziale:**
  * Integrazione Service Worker offline e manifest PWA per installazione rapida.
  * Sincronizzazione IndexedDB delle ricette iniziali e aggiunta gestione note personali.
  * Modalità Svuotafrigo e lista della spesa con selezione ingredienti.

---

### [1.0.0] - 2026-09-09
* **Rilascio Iniziale:**
  * Setup dell'applicazione con React 19, Vite e IndexedDB.
  * Visualizzatore ricette con modalità di cottura a schermo intero e timer sonori.
  * Calcolo dinamico delle porzioni e supporto dark/light mode.
