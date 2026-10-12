# 🎉 Happy 13th Birthday, Ibrahim!

> A fun, colorful, fully responsive 3-page birthday surprise website built with **React + Vite + Tailwind CSS**.

## 🌐 Live Demo

**👉 [https://birthday-surprise-theta-ivory.vercel.app/](https://birthday-surprise-theta-ivory.vercel.app/)**

---

## 📸 Preview

| 🏠 Home | 📷 Memories | 🎮 Game |
|--------|------------|--------|
| Animated birthday heading, balloons, cake, confetti & navigation buttons | Polaroid scrapbook gallery of 20 photos with lightbox viewer | Catch the Birthday Gifts mini-game with score & timer |

---

## ✨ Features

### 🏠 Home Page
- Large animated **"HAPPY 13TH BIRTHDAY, IBRAHIM!"** heading
- Floating 🎈 balloons, shimmering 🎂 cake, twinkling ⭐ stars
- Colourful confetti rain (pure CSS, no libraries)
- Personalised birthday message
- Buttons to navigate to the Game and Memories pages
- *"Made with 💜 just for you"* footer

### 📸 Memories Page
- Beautiful **Polaroid / scrapbook-style** photo gallery
- All **20 personal photos** with slight random rotations & coloured borders
- Emoji sticker decorations on each card
- Editable captions under each photo
- **Lightbox viewer** with Prev / Next navigation
- Friendly placeholder shown if an image is missing

### 🎮 Game Page — Catch the Birthday Gifts!
- Move a 🧺 basket to catch falling 🎁 gifts
- **Keyboard controls:** `←` `→` Arrow keys or `A` / `D`
- **Touch controls:** On-screen ◀ ▶ buttons for mobile
- +10 points per caught gift
- 30-second countdown timer
- Score display with pop animation on each catch
- **Start**, **Play Again**, and **Back to Home** buttons
- Result screen with personalised message (e.g. *"Birthday Champion! 🏆"*)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 18](https://react.dev/) | UI components & state |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Google Fonts – Nunito + Pacifico](https://fonts.google.com/) | Typography |
| Vanilla CSS animations | Confetti, balloons, stars, transitions |
| `requestAnimationFrame` | Smooth game loop |

No external game engines, no paid libraries, no backend.

---

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Saleha-Qayyum/birthday-surprise.git

# 2. Navigate into the project
cd birthday-surprise

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 📁 Project Structure

```
birthday-surprise/
├── public/
│   └── assets/              ← 20 personal photos go here
├── src/
│   ├── components/
│   │   └── Confetti.jsx     ← Reusable confetti animation
│   ├── pages/
│   │   ├── Home.jsx         ← 🏠 Home page
│   │   ├── Memories.jsx     ← 📸 Memories gallery
│   │   └── Game.jsx         ← 🎮 Catch the Gifts game
│   ├── App.jsx              ← Page switcher (no router needed)
│   ├── index.css            ← Global styles & animations
│   └── main.jsx             ← Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## ✏️ Customisation

| What to change | Where |
|---------------|-------|
| Name, age & birthday message | `src/pages/Home.jsx` — top of file |
| Photo captions | `src/pages/Memories.jsx` — `PHOTOS` array |
| Game difficulty (speed, timer, points) | `src/pages/Game.jsx` — `GAME CONFIG` section |
| Photos | Replace files in `public/assets/` |

---

## 🌐 Deploy

This project is deployed on **[Vercel](https://vercel.com)**. To deploy your own copy:

1. Push your repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — just click **Deploy** ✅

---

<p align="center">Made with 💜 for Ibrahim's 13th Birthday 🎂</p>
