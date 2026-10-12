import Confetti from '../components/Confetti'

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  CUSTOMISE HERE
//    Change the name, subtitle and birthday message to personalise the page.
// ─────────────────────────────────────────────────────────────────────────────
const BIRTHDAY_NAME = 'Ibrahim'           // ← change the name here
const BIRTHDAY_AGE = '14th'             // ← change the age here
const BIRTHDAY_MESSAGE = `
  You're officially a TEENAGER now, and honestly? We're not surprised —
  you've always been cooler than your age! 😎 Always a little pooh to me no matter what age you are! <3
  You are my tidda altough we have almost same height now. Love you poohiee`.trim()
// ─────────────────────────────────────────────────────────────────────────────

export default function Home({ navigate }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex flex-col items-center justify-center px-4 py-12">
      {/* ── Confetti layer ── */}
      <Confetti count={50} />

      {/* ── Background decorative circles ── */}
      <div className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 rounded-full bg-pink-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-[-60px] w-48 h-48 rounded-full bg-yellow-500/10 blur-2xl pointer-events-none" />

      {/* ── Main card ── */}
      <div className="relative z-10 max-w-2xl w-full text-center">

        {/* Stars row */}
        <div className="flex justify-center gap-3 text-3xl mb-4 select-none">
          <span className="star star-1">⭐</span>
          <span className="star star-2">✨</span>
          <span className="star star-3">🌟</span>
          <span className="star star-4">✨</span>
          <span className="star star-5">⭐</span>
        </div>

        {/* Balloons row */}
        <div className="flex justify-center gap-4 text-5xl mb-6 select-none">
          <span className="balloon balloon-1">🎈</span>
          <span className="balloon balloon-2">🎀</span>
          <span className="balloon balloon-3">🎊</span>
          <span className="balloon balloon-4">🎀</span>
          <span className="balloon balloon-5">🎈</span>
        </div>

        {/* Cake */}
        <div className="text-7xl mb-4 select-none">
          <span className="cake-emoji">🎂</span>
        </div>

        {/* Main heading */}
        <h1
          className="birthday-title font-black text-transparent bg-clip-text leading-tight mb-2"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: 'clamp(2rem, 8vw, 3.8rem)',
            backgroundImage: 'linear-gradient(135deg, #facc15 0%, #f472b6 40%, #818cf8 80%, #38bdf8 100%)',
          }}
        >
          🎉 HAPPY {BIRTHDAY_AGE} BIRTHDAY, {BIRTHDAY_NAME}! 🎉
        </h1>

        {/* Subtitle sparkle line */}
        <p className="text-pink-300 text-lg font-bold mb-6 tracking-widest uppercase">
          ✨ Today is YOUR day! ✨
        </p>

        {/* Birthday message card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-8 text-white/90 text-base sm:text-lg leading-relaxed shadow-2xl">
          {BIRTHDAY_MESSAGE}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            id="btn-play-game"
            onClick={() => navigate('game')}
            className="btn-bounce bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-extrabold text-xl py-4 px-8 rounded-full shadow-lg"
          >
            🎮 Play a Game
          </button>
          <button
            id="btn-our-memories"
            onClick={() => navigate('memories')}
            className="btn-bounce bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-xl py-4 px-8 rounded-full shadow-lg"
          >
            📸 Your Memories
          </button>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center gap-3 text-2xl mb-6 select-none">
          <span className="star star-3">🎁</span>
          <span className="star star-1">🥳</span>
          <span className="star star-4">🎁</span>
        </div>

        {/* Made with love */}
        <p className="text-white/40 text-sm">
          Made with 💜 just for you, {BIRTHDAY_NAME}!
        </p>
      </div>
    </div>
  )
}
