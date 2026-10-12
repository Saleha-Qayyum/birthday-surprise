import { useState } from 'react'
import Home from './pages/Home'
import Memories from './pages/Memories'
import Game from './pages/Game'

// ─────────────────────────────────────────────────────────────────────────────
// Simple state-based page switcher (no router needed)
// Pages: 'home' | 'memories' | 'game'
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (target) => {
    window.scrollTo(0, 0)
    setPage(target)
  }

  return (
    <>
      {page === 'home'     && <Home navigate={navigate} />}
      {page === 'memories' && <Memories navigate={navigate} />}
      {page === 'game'     && <Game navigate={navigate} />}
    </>
  )
}
