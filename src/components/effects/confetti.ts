import confetti from 'canvas-confetti'

const COLORS = ['#1f2a5c', '#c8102e', '#e8b74a', '#f7f3ec', '#8b5a2b']

export function burstConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const base = { colors: COLORS, ticks: 220, gravity: 0.9, scalar: 0.9, disableForReducedMotion: true }
  confetti({ ...base, particleCount: 90, spread: 80, startVelocity: 45, origin: { x: 0.5, y: 0.65 } })
  setTimeout(() => {
    confetti({ ...base, particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.75 } })
    confetti({ ...base, particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.75 } })
  }, 250)
}

export function sideConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const end = Date.now() + 1200
  const frame = () => {
    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: COLORS })
    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: COLORS })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

