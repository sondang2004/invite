import { useMemo } from 'react'

const GLYPHS = ['✦', '◆', '•', '✧', '◇', '·']
const COLORS = ['#e4be6a', '#f6df9e', '#38bdf8', '#94a3b8']

/** Các hạt bụi vàng & ánh xanh bay nhẹ ở nền tối */
export function Sparkles({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        size: 6 + ((i * 29) % 10),
        duration: 13 + ((i * 53) % 13),
        delay: -((i * 41) % 20),
        glyph: GLYPHS[i % GLYPHS.length],
        color: COLORS[i % COLORS.length],
        opacity: 0.18 + ((i * 13) % 35) / 100,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((it, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: it.left,
            fontSize: it.size,
            color: it.color,
            opacity: it.opacity,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.glyph}
        </span>
      ))}
    </div>
  )
}
