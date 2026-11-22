import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'
import { toBlob, toPng } from 'html-to-image'
import { EVENT, MAPS_URL, calendarUrl } from '../../config/event'
import { bouncySpring, easeOutExpo } from '../../lib/motion'
import { sideConfetti } from '../effects/confetti'
import { HandwrittenText } from '../ui/Paper'
import { CornerBracket, GoldDivider, GraduationCrest } from '../ui/Stickers'

/** Phần tử xuất hiện theo độ trễ */
function Reveal({
  delay,
  children,
  className = '',
  from = { opacity: 0, y: 16 },
}: {
  delay: number
  children: ReactNode
  className?: string
  from?: Record<string, number>
}) {
  return (
    <motion.div className={className} initial={from} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} transition={{ ...bouncySpring, delay }}>
      {children}
    </motion.div>
  )
}

/** Cỡ chữ tên khách tự co giãn theo độ dài */
function nameSize(name: string): string {
  const n = Array.from(name).length
  if (n <= 10) return '10.5cqw'
  if (n <= 15) return '8.6cqw'
  if (n <= 21) return '6.8cqw'
  return '5.5cqw'
}

const serifCaps: CSSProperties = { fontFamily: 'var(--font-serif)', letterSpacing: '0.14em' }

/** Step 6: Thiệp tốt nghiệp VIP màu đen lì & vàng ánh kim – không dùng ảnh */
export function InvitationStep({ name, onReplay }: { name: string; onReplay: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(sideConfetti, 850)
    return () => clearTimeout(t)
  }, [])

  const save = async () => {
    const el = cardRef.current
    if (!el || saving) return
    setSaving(true)
    try {
      await document.fonts?.ready
      const rect = el.getBoundingClientRect()
      const width = Math.round(rect.width)
      const height = Math.round(rect.height)
      const options = {
        pixelRatio: 3,
        cacheBust: false,
        width,
        height,
        backgroundColor: '#0b1120',
        style: {
          width: `${width}px`,
          height: `${height}px`,
          transform: 'none',
          margin: '0',
          backgroundColor: '#0b1120',
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.16), transparent 52%), radial-gradient(circle at 50% 100%, rgba(228,190,106,0.14), transparent 50%), linear-gradient(155deg, #0d1527 0%, #090e1a 55%, #0e1628 100%)',
          boxShadow: 'none',
        },
      }

      const safeName =
        name
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .toLowerCase() || 'khach-moi'
      const fileName = `thiep-tot-nghiep-${safeName}.png`

      await toPng(el, { ...options, pixelRatio: 1 }).catch(() => { })

      const blob = await toBlob(el, options)
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }, 1500)
      } else {
        const dataUrl = await toPng(el, options)
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    } catch (err) {
      console.error(err)
      alert('Không lưu được ảnh, bạn thử chụp màn hình giúp mình nha!')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex min-h-dvh flex-col items-center px-4 py-8 sm:py-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 36 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.95, ease: easeOutExpo }}
        className="w-[min(94vw,460px)]"
      >
        {/* ===== TẤM THIỆP VIP ===== */}
        <div
          ref={cardRef}
          className="noir-card relative flex w-full flex-col justify-between overflow-hidden rounded-[6px] border border-gold/45 p-[6cqw]"
          style={{
            aspectRatio: '726 / 1024',
            containerType: 'inline-size',
            boxShadow: '0 32px 70px -24px rgba(0,0,0,0.9), 0 0 36px -12px rgba(228,190,106,0.25)',
          }}
        >
          {/* Lưới kỹ thuật siêu mảnh nền thiệp */}
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                'linear-gradient(rgba(228,190,106,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(228,190,106,0.08) 1px, transparent 1px)',
              backgroundSize: '7cqw 7cqw',
            }}
          />

          {/* Khung viền kép ánh kim & 4 góc kiến trúc */}
          <div className="pointer-events-none absolute inset-[3cqw] border border-gold/30" />
          <CornerBracket className="pointer-events-none absolute top-[4.2cqw] left-[4.2cqw] h-[5.5cqw] w-[5.5cqw]" />
          <CornerBracket className="pointer-events-none absolute top-[4.2cqw] right-[4.2cqw] h-[5.5cqw] w-[5.5cqw] rotate-90" />
          <CornerBracket className="pointer-events-none absolute right-[4.2cqw] bottom-[4.2cqw] h-[5.5cqw] w-[5.5cqw] rotate-180" />
          <CornerBracket className="pointer-events-none absolute bottom-[4.2cqw] left-[4.2cqw] h-[5.5cqw] w-[5.5cqw] -rotate-90" />

          {/* 1. Header & Huy hiệu */}
          <div className="relative z-10 flex flex-col items-center pt-[2cqw] text-center">
            <Reveal delay={0.2} from={{ opacity: 0, y: -12 }}>
              <p className="font-semibold text-bk-blue uppercase" style={{ fontSize: '2.5cqw', letterSpacing: '0.38em' }}>
                HCMUT · CLASS OF 2026
              </p>
            </Reveal>

            <Reveal delay={0.4} from={{ opacity: 0, scale: 0.6 }} className="my-[2.5cqw]">
              <GraduationCrest className="h-[22cqw] w-[22cqw]" style={{ filter: 'drop-shadow(0 0 14px rgba(228,190,106,0.3))' }} />
            </Reveal>

            <Reveal delay={0.6} from={{ opacity: 0, y: 12 }}>
              <p className="font-medium text-ivory/75 uppercase" style={{ fontSize: '2.6cqw', letterSpacing: '0.3em' }}>
                TRÂN TRỌNG KÍNH MỜI THAM DỰ
              </p>
            </Reveal>

            <Reveal delay={0.8} from={{ opacity: 0, y: 14 }}>
              <h2
                className="mt-[3.4cqw] leading-none font-bold text-gold-light"
                style={{ ...serifCaps, fontSize: '8.6cqw', letterSpacing: '0.1em', textShadow: '0 2px 16px rgba(228,190,106,0.35)' }}
              >
                LỄ TỐT NGHIỆP
              </h2>
            </Reveal>

            <Reveal delay={1} className="mt-[2.5cqw] w-[52%]">
              <GoldDivider />
            </Reveal>
          </div>

          {/* 2. Tên chủ nhân buổi lễ */}
          <Reveal delay={1.15} className="relative z-10 text-center">
            <p className="font-medium text-muted uppercase" style={{ fontSize: '2.4cqw', letterSpacing: '0.3em' }}>
              TÂN CỬ NHÂN
            </p>
            <p
              className="mt-[1.2cqw] font-serif font-bold tracking-[0.12em] text-ivory uppercase"
              style={{ fontSize: '6.6cqw' }}
            >
              {EVENT.host}
            </p>
            <p className="mt-[0.8cqw] font-medium tracking-[0.16em] text-bk-blue uppercase" style={{ fontSize: '2.7cqw' }}>
              {EVENT.school}
            </p>
          </Reveal>

          {/* 3. Khung khách mời VIP */}
          <Reveal delay={1.4} className="relative z-10 mx-auto w-[86%]">
            <div
              className="relative flex flex-col items-center rounded-[4px] border border-gold/40 px-[4cqw] py-[3.2cqw] text-center"
              style={{ background: 'linear-gradient(180deg, rgba(228,190,106,0.09) 0%, rgba(15,23,42,0.55) 100%)' }}
            >
              <span className="font-semibold text-gold/85 uppercase" style={{ fontSize: '2.5cqw', letterSpacing: '0.32em' }}>
                THÂN MỜI
              </span>
              <HandwrittenText
                delay={1.85}
                duration={1.3}
                className="mt-[0.6cqw] font-script leading-tight font-bold text-gold-light"
                style={{ fontSize: nameSize(name), maxWidth: '100%', overflowWrap: 'anywhere' }}
              >
                {name}
              </HandwrittenText>
            </div>
          </Reveal>

          {/* 4. Thời gian & Địa điểm */}
          <Reveal delay={1.8} className="relative z-10 px-[1cqw]">
            <div className="grid grid-cols-[1fr_auto_1.5fr] items-center gap-[2.4cqw] border-y border-gold/25 py-[3.2cqw] text-center">
              <div>
                <p className="font-semibold text-gold uppercase" style={{ fontSize: '2.4cqw', letterSpacing: '0.24em' }}>
                  THỜI GIAN
                </p>
                <p className="mt-[1cqw] font-serif font-bold text-ivory uppercase" style={{ fontSize: '3.5cqw', letterSpacing: '0.06em' }}>
                  {EVENT.weekday}
                </p>
                <p className="mt-[0.4cqw] font-semibold text-gold-light" style={{ fontSize: '3.3cqw', letterSpacing: '0.08em' }}>
                  {EVENT.date}
                </p>
                <p className="mt-[0.4cqw] font-medium text-ivory/90" style={{ fontSize: '3cqw', letterSpacing: '0.06em' }}>
                  {EVENT.time}
                </p>
              </div>

              <div className="h-[15cqw] w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />

              <div>
                <p className="font-semibold text-gold uppercase" style={{ fontSize: '2.4cqw', letterSpacing: '0.24em' }}>
                  ĐỊA ĐIỂM
                </p>
                <p className="mt-[1cqw] font-serif leading-snug font-bold text-ivory uppercase" style={{ fontSize: '3cqw', letterSpacing: '0.04em' }}>
                  {EVENT.school}
                </p>
                <p className="mt-[0.8cqw] leading-snug text-ivory/80" style={{ fontSize: '2.5cqw' }}>
                  {EVENT.address}
                </p>
              </div>
            </div>
          </Reveal>

          {/* 5. Footer & Số điện thoại liên hệ */}
          <Reveal delay={2.1} className="relative z-10 flex flex-col items-center gap-[1.8cqw] pb-[1cqw] text-center">
            <div className="flex w-[88%] items-center justify-center gap-[2.4cqw]">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <a
                href={`tel:${EVENT.phoneRaw}`}
                className="whitespace-nowrap text-ivory/85 transition-colors hover:text-gold-light"
                style={{ ...serifCaps, fontSize: '2.55cqw', letterSpacing: '0.12em' }}
              >
                LIÊN HỆ · <span className="font-bold text-gold-light">{EVENT.phone}</span> (CÔNG SƠN)
              </a>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
            <p className="italic text-ivory/70" style={{ fontSize: '2.55cqw' }}>
              Sự hiện diện của bạn là niềm vinh hạnh lớn của mình!
            </p>
          </Reveal>
        </div>
      </motion.div>

      {/* ===== NÚT HÀNH ĐỘNG ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.6 }}
        className="mt-7 grid w-[min(94vw,460px)] grid-cols-2 gap-3"
      >
        <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn text-sm">
          📍 Chỉ đường
        </a>
        <a href={calendarUrl(name)} target="_blank" rel="noreferrer" className="btn text-sm">
          📅 Thêm vào lịch
        </a>
        <button onClick={save} disabled={saving} className="btn btn-ghost text-sm">
          {saving ? 'Đang lưu…' : '📥 Lưu thiệp'}
        </button>
        <button onClick={onReplay} className="btn btn-ghost text-sm">
          🔁 Xem lại
        </button>
      </motion.div>
      <p className="mt-6 text-center font-serif text-lg tracking-wide text-gold/85">Hẹn gặp {name} tại Bách khoa nha! 🎓</p>
    </motion.section>
  )
}
