import { useMemo } from 'react'

const GLYPHS = ['✦', '✧', '•', '❀', '✦', '♡']
const COLORS = ['#e8b74a', '#c8102e', '#1f2a5c', '#d4a373']

/** Các hạt lấp lánh bay nhẹ ở nền (CSS animation, rất nhẹ cho mobile) */
export function Sparkles({ count = 16 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        size: 8 + ((i * 37) % 12),
        duration: 12 + ((i * 53) % 12),
        delay: -((i * 41) % 20),
        glyph: GLYPHS[i % GLYPHS.length],
        color: COLORS[i % COLORS.length],
        opacity: 0.25 + ((i * 13) % 40) / 100,
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

