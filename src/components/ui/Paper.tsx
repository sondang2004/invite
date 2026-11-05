import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'

/** Tạo clip-path đa giác răng cưa ổn định (seeded) để làm mép giấy xé */
export function tornClipPath(seed = 1, amp = 1.6, steps = 26): string {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const pts: string[] = []
  const j = () => (rand() * amp).toFixed(2)
  for (let i = 0; i <= steps; i++) pts.push(`${((i / steps) * 100).toFixed(2)}% ${j()}%`)
  for (let i = 0; i <= steps; i++) pts.push(`${(100 - +j()).toFixed(2)}% ${((i / steps) * 100).toFixed(2)}%`)
  for (let i = steps; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(2)}% ${(100 - +j()).toFixed(2)}%`)
  for (let i = steps; i >= 0; i--) pts.push(`${j()}% ${((i / steps) * 100).toFixed(2)}%`)
  return `polygon(${pts.join(',')})`
}

type BaseProps = { className?: string; style?: CSSProperties; children?: ReactNode }

/** Băng keo giấy (washi tape) */
export function WashiTape({ className = '', style, children }: BaseProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(214,196,164,0.95), rgba(200,180,146,0.95))',
        clipPath:
          'polygon(2% 8%, 0% 30%, 2% 55%, 0% 80%, 2% 100%, 98% 96%, 100% 74%, 98% 48%, 100% 22%, 97% 0%)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Mẩu giấy note */
export function PaperNote({
  className = '',
  style,
  children,
  folded = false,
  tape = false,
}: BaseProps & { folded?: boolean; tape?: boolean }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: 'linear-gradient(160deg, #f4ecda 0%, #ebe0c8 100%)',
        boxShadow: '0 10px 20px -8px rgba(80,60,30,0.35), 0 2px 4px rgba(0,0,0,0.08)',
        clipPath: folded ? 'polygon(0 0, 100% 0, 100% 82%, 86% 100%, 0 100%)' : undefined,
        ...style,
      }}
    >
      {tape && (
        <div
          className="absolute left-1/2 -top-3 h-6 w-20 -translate-x-1/2 -rotate-3"
          style={{ background: 'rgba(220,205,178,0.85)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        />
      )}
      {folded && (
        <div
          className="absolute right-0 bottom-0 h-[18%] w-[14%]"
          style={{ background: 'linear-gradient(135deg, #d8caa9 0%, #c9b98f 50%, transparent 50%)', transform: 'rotate(180deg)' }}
        />
      )}
      {children}
    </div>
  )
}

/** Ảnh có viền giấy trắng xé răng cưa */
export function TornPhoto({ src, alt, className = '', style, seed = 7 }: BaseProps & { src: string; alt: string; seed?: number }) {
  return (
    <div className={`relative ${className}`} style={{ filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.18))', ...style }}>
      <div className="absolute inset-0 bg-white" style={{ clipPath: tornClipPath(seed, 2.2) }} />
      <img
        src={src}
        alt={alt}
        className="absolute inset-[3.5%] h-[93%] w-[93%] object-cover"
        style={{ clipPath: tornClipPath(seed + 3, 1.6) }}
        draggable={false}
      />
    </div>
  )
}

/** Chữ hiện ra như đang được viết tay (mask quét trái → phải) */
export function HandwrittenText({
  children,
  className = '',
  style,
  delay = 0,
  duration = 1.4,
}: BaseProps & { delay?: number; duration?: number }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ paddingInline: '0.15em', ...style }}
      initial={{ clipPath: 'inset(-20% 100% -20% 0)', opacity: 0.3 }}
      animate={{ clipPath: 'inset(-20% -5% -20% 0)', opacity: 1 }}
      transition={{ delay, duration, ease: [0.45, 0, 0.25, 1] }}
    >
      {children}
    </motion.span>
  )
}

/** Hiệu ứng gõ chữ từng ký tự */
export function Typewriter({ text, className = '', delay = 0, speed = 0.05 }: { text: string; className?: string; delay?: number; speed?: number }) {
  const chars = Array.from(text)
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * speed, duration: 0.2 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  )
}

