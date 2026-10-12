import { useState, useEffect, useRef, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// GAME CONFIG — tweak these to change difficulty
// ─────────────────────────────────────────────────────────────────────────────
const GAME_DURATION  = 30       // seconds
const BASKET_WIDTH   = 90       // px
const BASKET_SPEED   = 20       // px per key-press / touch step
const GIFT_SIZE      = 48       // px (font-size of the emoji)
const GIFT_SPAWN_MS  = 900      // how often a new gift drops (ms)
const POINTS_PER_HIT = 10       // score per caught gift

const GIFT_EMOJIS = ['🎁', '🎀', '🎊', '🎉', '⭐', '🌟', '💝', '🍭']

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
let nextId = 0
function createGift(areaWidth) {
  return {
    id: nextId++,
    x: Math.random() * (areaWidth - GIFT_SIZE),
    y: -GIFT_SIZE,
    speed: 2.5 + Math.random() * 2.5,   // px per frame
    emoji: GIFT_EMOJIS[Math.floor(Math.random() * GIFT_EMOJIS.length)],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULT MESSAGES
// ─────────────────────────────────────────────────────────────────────────────
function resultMessage(score) {
  if (score >= 200) return { title: '🏆 Birthday Champion!',    sub: 'You are absolutely LEGENDARY!' }
  if (score >= 120) return { title: '🥇 Gift-Catching Master!', sub: 'Seriously impressive skills!' }
  if (score >= 60)  return { title: '🎉 Great Job, Champ!',     sub: 'Keep practising — you\'re getting there!' }
  if (score >= 20)  return { title: '😄 Nice Try!',             sub: 'Play again and beat your score!' }
  return { title: '🎮 Keep Trying!', sub: 'Every champion starts somewhere!' }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Game({ navigate }) {
  const [phase, setPhase]       = useState('idle')   // 'idle' | 'playing' | 'result'
  const [score, setScore]       = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [gifts, setGifts]       = useState([])
  const [basketX, setBasketX]   = useState(0)        // set properly on start
  const [scoreAnim, setScoreAnim] = useState(false)

  // Refs for values used inside rAF loops (avoids stale closures)
  const areaRef        = useRef(null)   // the game area div
  const basketXRef     = useRef(0)
  const giftsRef       = useRef([])
  const scoreRef       = useRef(0)
  const phaseRef       = useRef('idle')
  const keysRef        = useRef({ left: false, right: false })
  const rafRef         = useRef(null)
  const timerRef       = useRef(null)
  const spawnRef       = useRef(null)
  const areaWidthRef   = useRef(300)

  // ── Sync refs with state ──────────────────────────────────────────────────
  useEffect(() => { phaseRef.current = phase }, [phase])

  // ── Stop all loops helper ─────────────────────────────────────────────────
  const stopAll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    clearInterval(timerRef.current)
    clearInterval(spawnRef.current)
  }, [])

  // ── START ─────────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    stopAll()

    const areaWidth = areaRef.current?.clientWidth || 300
    areaWidthRef.current = areaWidth
    const startX = areaWidth / 2 - BASKET_WIDTH / 2
    basketXRef.current = startX
    giftsRef.current   = []
    scoreRef.current   = 0
    nextId             = 0

    setScore(0)
    setTimeLeft(GAME_DURATION)
    setGifts([])
    setBasketX(startX)
    setPhase('playing')
    phaseRef.current = 'playing'

    // ── Countdown timer ───────────────────────────────────────────────────
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        const next = t - 1
        if (next <= 0) {
          clearInterval(timerRef.current)
          clearInterval(spawnRef.current)
          cancelAnimationFrame(rafRef.current)
          setPhase('result')
          phaseRef.current = 'result'
          return 0
        }
        return next
      })
    }, 1000)

    // ── Gift spawner ──────────────────────────────────────────────────────
    spawnRef.current = setInterval(() => {
      if (phaseRef.current !== 'playing') return
      giftsRef.current = [...giftsRef.current, createGift(areaWidthRef.current)]
    }, GIFT_SPAWN_MS)

    // ── rAF game loop ──────────────────────────────────────────────────────
    let lastTime = performance.now()
    function loop(now) {
      if (phaseRef.current !== 'playing') return

      const dt = (now - lastTime) / 16.67  // normalise to ~60fps
      lastTime = now

      // Move basket with keys
      const keys = keysRef.current
      let bx = basketXRef.current
      const maxX = areaWidthRef.current - BASKET_WIDTH
      if (keys.left)  bx = Math.max(0,    bx - BASKET_SPEED * dt)
      if (keys.right) bx = Math.min(maxX, bx + BASKET_SPEED * dt)
      basketXRef.current = bx

      // Move gifts + collision detection
      const areaH = areaRef.current?.clientHeight || 400
      const basketTop = areaH - 80  // px from top of game area

      const survived = []
      let scored = false

      for (const g of giftsRef.current) {
        const ny = g.y + g.speed * dt

        // Collision: gift bottom overlaps basket?
        const giftBottom = ny + GIFT_SIZE
        const giftCentreX = g.x + GIFT_SIZE / 2
        const basketRight = bx + BASKET_WIDTH

        if (
          giftBottom >= basketTop &&
          giftBottom <= basketTop + 50 &&
          giftCentreX >= bx &&
          giftCentreX <= basketRight
        ) {
          scoreRef.current += POINTS_PER_HIT
          scored = true
          // Gift is caught — don't add to survived
        } else if (ny > areaH) {
          // Gift fell off screen — discard
        } else {
          survived.push({ ...g, y: ny })
        }
      }

      giftsRef.current = survived

      // Batch React state updates once per frame
      setGifts([...survived])
      setBasketX(bx)
      if (scored) {
        setScore(scoreRef.current)
        setScoreAnim(true)
        setTimeout(() => setScoreAnim(false), 300)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [stopAll])

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => stopAll(), [stopAll])

  // ── Keyboard controls ─────────────────────────────────────────────────────
  useEffect(() => {
    const down = (e) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key))  keysRef.current.left  = true
      if (['ArrowRight', 'd', 'D'].includes(e.key)) keysRef.current.right = true
    }
    const up = (e) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key))  keysRef.current.left  = false
      if (['ArrowRight', 'd', 'D'].includes(e.key)) keysRef.current.right = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // ── Touch controls ────────────────────────────────────────────────────────
  const moveBasketTouch = useCallback((direction) => {
    if (phaseRef.current !== 'playing') return
    const maxX = areaWidthRef.current - BASKET_WIDTH
    if (direction === 'left') {
      basketXRef.current = Math.max(0, basketXRef.current - BASKET_SPEED * 3)
    } else {
      basketXRef.current = Math.min(maxX, basketXRef.current + BASKET_SPEED * 3)
    }
    setBasketX(basketXRef.current)
  }, [])

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  const result = resultMessage(score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex flex-col page-enter">

      {/* ── Top bar ── */}
      <header className="z-10 backdrop-blur-md bg-indigo-950/70 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button
          id="btn-game-back-home"
          onClick={() => { stopAll(); navigate('home') }}
          className="btn-bounce text-white font-bold bg-purple-700/60 hover:bg-purple-600/80 rounded-full px-4 py-2 text-sm transition-colors"
        >
          ← Home
        </button>
        <h1
          className="text-xl sm:text-2xl font-black text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(90deg,#facc15,#f472b6)', fontFamily: 'Pacifico,cursive' }}
        >
          🎁 Catch the Gifts!
        </h1>

        {/* Score + Timer */}
        <div className="flex gap-3 text-sm font-bold">
          <span className={`bg-yellow-400 text-gray-900 px-3 py-1 rounded-full ${scoreAnim ? 'score-pop' : ''}`}>
            ⭐ {score}
          </span>
          <span className={`px-3 py-1 rounded-full font-mono ${timeLeft <= 10 ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-600 text-white'}`}>
            ⏱ {timeLeft}s
          </span>
        </div>
      </header>

      {/* ── Game Area ── */}
      <div
        ref={areaRef}
        id="game-area"
        className="relative flex-1 overflow-hidden select-none"
        style={{ minHeight: '380px', maxHeight: '60vh', background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #0f0a1e 100%)' }}
      >
        {/* Stars background decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute text-white/20 select-none"
              style={{
                left: `${(i * 37) % 95}%`,
                top: `${(i * 53) % 80}%`,
                fontSize: `${8 + (i % 5) * 4}px`,
              }}
            >★</span>
          ))}
        </div>

        {/* Falling gifts */}
        {gifts.map((g) => (
          <span
            key={g.id}
            className="absolute pointer-events-none leading-none"
            style={{
              left: g.x,
              top: g.y,
              fontSize: GIFT_SIZE,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}
          >
            {g.emoji}
          </span>
        ))}

        {/* Basket */}
        {phase === 'playing' && (
          <div
            id="game-basket"
            className="absolute bottom-10 flex flex-col items-center pointer-events-none"
            style={{ left: basketX, width: BASKET_WIDTH }}
          >
            <span style={{ fontSize: 48 }}>🧺</span>
          </div>
        )}

        {/* Idle overlay */}
        {phase === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/40 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-6xl mb-3">🎁</div>
              <h2 className="text-white font-black text-2xl mb-2" style={{ fontFamily: 'Pacifico,cursive' }}>
                Catch the Birthday Gifts!
              </h2>
              <p className="text-white/60 text-sm max-w-xs mx-auto">
                Move the basket with ← → arrow keys (or A/D). Catch as many gifts as you can in 30 seconds!
              </p>
            </div>
            <button
              id="btn-start-game"
              onClick={startGame}
              className="btn-bounce bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-extrabold text-xl py-4 px-10 rounded-full shadow-2xl"
            >
              🎮 Start Game
            </button>
          </div>
        )}

        {/* Result overlay */}
        {phase === 'result' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm">
            <div
              className="bg-gradient-to-br from-purple-800 to-indigo-800 border border-white/20 rounded-3xl p-8 text-center shadow-2xl max-w-sm mx-4"
            >
              <div className="text-5xl mb-3">🏅</div>
              <h2 className="text-white font-black text-2xl mb-1" style={{ fontFamily: 'Pacifico,cursive' }}>
                {result.title}
              </h2>
              <p className="text-white/70 text-sm mb-4">{result.sub}</p>
              <p className="text-yellow-300 font-black text-4xl mb-6">
                {score} pts
              </p>
              <div className="flex flex-col gap-3">
                <button
                  id="btn-play-again"
                  onClick={startGame}
                  className="btn-bounce bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-extrabold py-3 px-8 rounded-full text-lg"
                >
                  🔄 Play Again
                </button>
                <button
                  id="btn-result-home"
                  onClick={() => { stopAll(); navigate('home') }}
                  className="btn-bounce bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full text-base transition-colors"
                >
                  🏠 Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile Touch Controls ── */}
      <div className="flex gap-4 justify-center items-center py-4 bg-indigo-950/80 border-t border-white/10">
        <p className="text-white/40 text-xs hidden sm:block">Arrow keys / A D to move</p>

        {/* Left touch button */}
        <button
          id="btn-touch-left"
          aria-label="Move basket left"
          className="btn-bounce w-20 h-14 bg-purple-700/70 hover:bg-purple-600 active:bg-purple-500 text-white text-3xl rounded-2xl font-bold touch-none select-none border border-white/20"
          onPointerDown={() => {
            const iv = setInterval(() => moveBasketTouch('left'), 40)
            const up = () => { clearInterval(iv); window.removeEventListener('pointerup', up) }
            window.addEventListener('pointerup', up)
          }}
        >
          ◀
        </button>

        {/* Right touch button */}
        <button
          id="btn-touch-right"
          aria-label="Move basket right"
          className="btn-bounce w-20 h-14 bg-purple-700/70 hover:bg-purple-600 active:bg-purple-500 text-white text-3xl rounded-2xl font-bold touch-none select-none border border-white/20"
          onPointerDown={() => {
            const iv = setInterval(() => moveBasketTouch('right'), 40)
            const up = () => { clearInterval(iv); window.removeEventListener('pointerup', up) }
            window.addEventListener('pointerup', up)
          }}
        >
          ▶
        </button>
      </div>

      {/* Score + Timer (mobile duplicate for easy reading) */}
      {phase === 'playing' && (
        <div className="flex justify-center gap-6 py-3 bg-indigo-950/60">
          <span className={`text-xl font-black text-yellow-300 ${scoreAnim ? 'score-pop' : ''}`}>
            ⭐ Score: {score}
          </span>
          <span className={`text-xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-purple-300'}`}>
            ⏱ {timeLeft}s
          </span>
        </div>
      )}
    </div>
  )
}
