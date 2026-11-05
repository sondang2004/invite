import type { CSSProperties } from 'react'

type Props = { className?: string; style?: CSSProperties }

/** Trái tim vẽ tay (gạch chéo kiểu bút sáp) */
export function HeartSticker({ className, style }: Props) {
  return (
    <svg viewBox="0 0 48 44" className={className} style={style} aria-hidden>
      <defs>
        <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#a5452d" strokeWidth="2.2" />
        </pattern>
      </defs>
      <path
        d="M24 40S4 28 4 15A10 10 0 0 1 24 9a10 10 0 0 1 20 6c0 13-20 25-20 25z"
        fill="url(#hatch)"
        stroke="#7c2d1e"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function StarSticker({ className, style, color = '#f2c14e' }: Props & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <polygon
        points="12,1.8 14.9,8.4 22,9.1 16.6,13.9 18.2,21 12,17.3 5.8,21 7.4,13.9 2,9.1 9.1,8.4"
        fill={color}
        stroke="#c4902a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function OutlineStar({ className, style }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <polygon
        points="12,2.5 14.7,8.8 21.5,9.4 16.3,13.9 17.9,20.6 12,17.1 6.1,20.6 7.7,13.9 2.5,9.4 9.3,8.8"
        fill="none"
        stroke="#c8102e"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CrownSticker({ className, style }: Props) {
  return (
    <svg viewBox="0 0 48 36" className={className} style={style} aria-hidden>
      <rect x="1" y="1" width="46" height="34" rx="3" fill="#fff" opacity="0.9" />
      <path
        d="M8 27 L7 10 L17 19 L24 7 L31 19 L41 10 L40 27 Z"
        fill="none"
        stroke="#222"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M8 30.5 Q24 28.5 40 30.5" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function ArrowHeartSticker({ className, style }: Props) {
  return (
    <svg viewBox="0 0 110 60" className={className} style={style} aria-hidden>
      <path d="M6 50 L98 12" stroke="#b33a2c" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M86 9 L99 11.5 L91 22" stroke="#b33a2c" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 44 L12 50 L4 56 M10 41 L18 47 L10 53" stroke="#b33a2c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path
        d="M54 36 C40 26 42 12 52 14 C56 15 57 19 58 21 C60 17 64 12 70 15 C78 20 68 32 54 36 Z"
        stroke="#b33a2c"
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FlowerSticker({ className, style }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="11" rx="6" ry="8.5" fill="none" stroke="#c8102e" strokeWidth="1.5" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="2.5" fill="#c8102e" />
    </svg>
  )
}

export function GradCap({ className, style }: Props) {
  return (
    <svg viewBox="0 0 64 52" className={className} style={style} aria-hidden>
      <path d="M15 24 v12 c0 7 34 7 34 0 V24 L32 31 Z" fill="#2a3778" />
      <polygon points="32,4 62,17 32,30 2,17" fill="#1f2a5c" stroke="#141c40" strokeWidth="1" />
      <circle cx="32" cy="17" r="2" fill="#c8102e" />
      <path d="M32 17 L55 21 V38" stroke="#c8102e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M52 37 h6 l-1 9 h-4 z" fill="#c8102e" />
    </svg>
  )
}

