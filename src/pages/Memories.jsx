import { useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  CUSTOMISE CAPTIONS
//    Update the caption text for each photo below.
//    The filenames map to the actual files in public/assets/.
// ─────────────────────────────────────────────────────────────────────────────
const PHOTOS = [
  { src: '/assets/Screenshot_20261012-222801_1.png', caption: '😄 Best of times!' },
  { src: '/assets/Screenshot_20261012-222819_1.png', caption: '🥳 Party vibes only!' },
  { src: '/assets/Screenshot_20261012-222827_1.png', caption: '✨ Shining bright!' },
  { src: '/assets/Screenshot_20261012-222837_1.png', caption: '🎉 Look at that smile!' },
  { src: '/assets/Screenshot_20261012-222848_1.png', caption: '🌟 Star of the show!' },
  { src: '/assets/Screenshot_20261012-222915_1.png', caption: '💜 Pure joy!' },
  { src: '/assets/Screenshot_20261012-222940_1.png', caption: '🎈 So much fun!' },
  { src: '/assets/Screenshot_20261012-222951_1.png', caption: '🚀 To infinity & beyond!' },
  { src: '/assets/Screenshot_20261012-223019_1.png', caption: '😂 Caught on camera!' },
  { src: '/assets/Screenshot_20261012-223030_1.png', caption: '🎂 Sweet memories!' },
  { src: '/assets/Screenshot_20261012-223041_1.png', caption: '🌈 Colourful days!' },
  { src: '/assets/Screenshot_20261012-223821_1.png', caption: '🎊 Celebration mode!' },
  { src: '/assets/Screenshot_20261012-223836_1.png', caption: '💫 Unstoppable!' },
  { src: '/assets/Screenshot_20261012-223855_1.png', caption: '🏆 Born champion!' },
  { src: '/assets/Screenshot_20261012-223914_1.png', caption: '❤️ Love this kid!' },
  { src: '/assets/Screenshot_20261012-223949_1.png', caption: '😎 Too cool for school!' },
  { src: '/assets/Screenshot_20261012-224001_1.png', caption: '🎵 Good times playlist!' },
  { src: '/assets/Screenshot_20261012-224011_1.png', caption: '🌙 Night vibes!' },
  { src: '/assets/Screenshot_20261012-224029_1.png', caption: '🦋 Growing up so fast!' },
  { src: '/assets/Screenshot_20261012-224047_1.png', caption: '🎁 The best surprise!' },
]

// Preset slight rotations so each card looks like a scrapbook
const ROTATIONS = ['-3deg', '2deg', '-1deg', '3deg', '-2deg', '1deg', '-4deg', '2.5deg', '-1.5deg', '3.5deg']

// Border accent colours (Polaroid strips)
const BORDER_COLORS = [
  'border-pink-400', 'border-yellow-400', 'border-purple-400',
  'border-blue-400', 'border-green-400', 'border-orange-400',
]

export default function Memories({ navigate }) {
  const [lightbox, setLightbox] = useState(null) // index of open photo, or null

  const close = (e) => {
    // Close only when clicking the dark overlay, not the image
    if (e.target === e.currentTarget) setLightbox(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 page-enter">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-indigo-950/70 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button
          id="btn-back-home"
          onClick={() => navigate('home')}
          className="btn-bounce flex items-center gap-2 text-white font-bold bg-purple-700/60 hover:bg-purple-600/80 rounded-full px-4 py-2 text-sm transition-colors"
        >
          ← Back to Home
        </button>
        <h1
          className="text-xl sm:text-2xl font-black text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(90deg,#f472b6,#818cf8)', fontFamily: 'Pacifico,cursive' }}
        >
          📸 Our Memories
        </h1>
        <div className="w-28" /> {/* spacer */}
      </header>

      {/* ── Subtitle ── */}
      <div className="text-center py-6 px-4">
        <p className="text-white/60 text-base">
          Click any photo to enlarge it 💜
        </p>
      </div>

      {/* ── Photo Grid ── */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              id={`memory-card-${i}`}
              role="button"
              tabIndex={0}
              aria-label={`Open memory photo ${i + 1}`}
              className={`polaroid bg-white rounded-xl p-2 pb-10 shadow-2xl ${BORDER_COLORS[i % BORDER_COLORS.length]} border-4 relative`}
              style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]})` }}
              onClick={() => setLightbox(i)}
              onKeyDown={(e) => e.key === 'Enter' && setLightbox(i)}
            >
              {/* Photo */}
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Friendly placeholder when image is missing
                    e.target.style.display = 'none'
                    e.target.parentNode.innerHTML =
                      '<div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 gap-2"><span style="font-size:2.5rem">📷</span><span class="text-gray-500 text-xs text-center px-2">Photo coming soon!</span></div>'
                  }}
                />
              </div>

              {/* Caption */}
              <p className="absolute bottom-1 left-0 right-0 text-center text-gray-700 text-xs font-bold px-2 truncate">
                {photo.caption}
              </p>

              {/* Sticker decoration (alternating) */}
              {i % 4 === 0 && (
                <span className="absolute -top-3 -right-3 text-xl select-none">⭐</span>
              )}
              {i % 4 === 1 && (
                <span className="absolute -top-3 -left-3 text-xl select-none">❤️</span>
              )}
              {i % 4 === 2 && (
                <span className="absolute -bottom-2 -right-3 text-xl select-none">✨</span>
              )}
              {i % 4 === 3 && (
                <span className="absolute -top-3 right-4 text-xl select-none">🌟</span>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          id="lightbox-overlay"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="lightbox-img max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={PHOTOS[lightbox].src}
              alt={PHOTOS[lightbox].caption}
              className="w-full object-contain max-h-[70vh]"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.innerHTML =
                  '<div class="flex flex-col items-center justify-center h-64 gap-3"><span style="font-size:3rem">📷</span><p class="text-gray-500">Photo coming soon!</p></div>'
              }}
            />
            <div className="p-4 text-center">
              <p className="text-gray-800 font-bold text-lg">{PHOTOS[lightbox].caption}</p>
              <p className="text-gray-400 text-sm mt-1">{lightbox + 1} / {PHOTOS.length}</p>
            </div>
            {/* Prev / Next */}
            <div className="flex justify-between px-4 pb-4 gap-2">
              <button
                id="lightbox-prev"
                onClick={() => setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length)}
                className="btn-bounce flex-1 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold rounded-xl py-2 text-sm transition-colors"
              >
                ← Prev
              </button>
              <button
                id="lightbox-close"
                onClick={() => setLightbox(null)}
                className="btn-bounce flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl py-2 text-sm transition-colors"
              >
                ✕ Close
              </button>
              <button
                id="lightbox-next"
                onClick={() => setLightbox((lightbox + 1) % PHOTOS.length)}
                className="btn-bounce flex-1 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold rounded-xl py-2 text-sm transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
