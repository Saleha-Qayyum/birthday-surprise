import { useMemo } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Confetti – renders N coloured squares that fall from the top of the screen.
// Pure CSS animation, zero dependencies.
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = [
  '#f43f5e', '#fb923c', '#facc15', '#4ade80',
  '#38bdf8', '#818cf8', '#e879f9', '#f9a8d4',
]

export default function Confetti({ count = 40 }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: COLORS[i % COLORS.length],
      size: `${6 + Math.random() * 10}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${4 + Math.random() * 6}s`,
      shape: Math.random() > 0.5 ? '50%' : '2px', // circle or square
    }))
  }, [count])

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  )
}
