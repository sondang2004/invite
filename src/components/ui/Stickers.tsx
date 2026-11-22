import type { CSSProperties } from 'react'

type Props = { className?: string; style?: CSSProperties }

/** Mũ tốt nghiệp ánh vàng kim sắc nét */
export function GradCap({ className, style }: Props) {
  return (
    <svg viewBox="0 0 80 60" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="cap-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fce7aa" />
          <stop offset="50%" stopColor="#e4be6a" />
          <stop offset="100%" stopColor="#a67c2e" />
        </linearGradient>
        <linearGradient id="cap-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090e1a" />
        </linearGradient>
      </defs>
      {/* Đế mũ */}
      <path d="M20 28 v13 c0 7 40 7 40 0 V28 L40 36 Z" fill="url(#cap-dark)" stroke="url(#cap-gold)" strokeWidth="1.6" />
      {/* Mặt trên mũ */}
      <polygon points="40,6 76,21 40,36 4,21" fill="url(#cap-dark)" stroke="url(#cap-gold)" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Nút đỉnh & dây tua vàng */}
      <circle cx="40" cy="21" r="2.6" fill="#f6df9e" />
      <path d="M40 21 L67 26 V44" stroke="url(#cap-gold)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M63.5 43 h7 l-1.2 10 h-4.6 z" fill="url(#cap-gold)" />
    </svg>
  )
}

/** Huy hiệu tốt nghiệp lục giác phong cách kỹ sư / Bách khoa */
export function GraduationCrest({ className, style }: Props) {
  return (
    <svg viewBox="0 0 140 140" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="crest-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fce7aa" />
          <stop offset="50%" stopColor="#e4be6a" />
          <stop offset="100%" stopColor="#9c7224" />
        </linearGradient>
        <linearGradient id="crest-cyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Vòng tròn kỹ thuật mảnh bên ngoài */}
      <circle cx="70" cy="70" r="64" fill="none" stroke="url(#crest-gold)" strokeWidth="0.7" strokeDasharray="3 4" opacity="0.55" />
      {/* Lục giác ngoài */}
      <polygon
        points="70,12 120,41 120,99 70,128 20,99 20,41"
        fill="rgba(11,17,32,0.85)"
        stroke="url(#crest-gold)"
        strokeWidth="1.6"
      />
      {/* Lục giác trong */}
      <polygon
        points="70,20 113,45 113,95 70,120 27,95 27,45"
        fill="url(#crest-cyan)"
        stroke="url(#crest-gold)"
        strokeWidth="0.8"
        opacity="0.7"
      />
      {/* Biểu tượng mũ tốt nghiệp ở tâm */}
      <g transform="translate(30, 34)">
        <path d="M20 26 v11 c0 6 40 6 40 0 V26 L40 34 Z" fill="#0b1120" stroke="url(#crest-gold)" strokeWidth="1.7" />
        <polygon points="40,6 74,20 40,34 6,20" fill="#111a30" stroke="url(#crest-gold)" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="40" cy="20" r="2.2" fill="#fce7aa" />
        <path d="M40 20 L65 24 V40" stroke="url(#crest-gold)" strokeWidth="2.1" fill="none" strokeLinecap="round" />
        <path d="M62 39 h6 l-1 8 h-4 z" fill="url(#crest-gold)" />
      </g>
      {/* 3 ngôi sao danh dự phía dưới */}
      <polygon points="70,96 71.7,100 76,100.3 72.7,103.1 73.7,107.2 70,105 66.3,107.2 67.3,103.1 64,100.3 68.3,100" fill="#f6df9e" />
      <circle cx="55" cy="102" r="1.6" fill="#e4be6a" opacity="0.85" />
      <circle cx="85" cy="102" r="1.6" fill="#e4be6a" opacity="0.85" />
    </svg>
  )
}

/** Góc trang trí kiểu khung kiến trúc / VIP pass */
export function CornerBracket({ className, style }: Props) {
  return (
    <svg viewBox="0 0 28 28" className={className} style={style} aria-hidden>
      <path d="M2 24 V2 H24" fill="none" stroke="#e4be6a" strokeWidth="1.8" />
      <path d="M7 16 V7 H16" fill="none" stroke="#e4be6a" strokeWidth="0.9" opacity="0.55" />
    </svg>
  )
}

/** Thanh ngăn cách có hình thoi vàng ở giữa */
export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/55 to-gold/80" />
      <span className="text-[10px] text-gold">◆</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/55 to-gold/80" />
    </div>
  )
}
