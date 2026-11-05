import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'
import { toPng } from 'html-to-image'
import campus from '../../assets/trinh-campus.jpg'
import cutout from '../../assets/trinh-cutout.png'
import { EVENT, MAPS_URL, calendarUrl } from '../../config/event'
import { bouncySpring, easeOutExpo } from '../../lib/motion'
import { sideConfetti } from '../effects/confetti'
import { HandwrittenText, PaperNote, TornPhoto } from '../ui/Paper'
import { ArrowHeartSticker, CrownSticker, HeartSticker, OutlineStar } from '../ui/Stickers'

/** Phần tử định vị tuyệt đối theo % của thiệp, xuất hiện có độ trễ */
function Piece({
  style,
  delay,
  children,
  from = { opacity: 0, y: 20 },
  className = '',
  idle,
}: {
  style: CSSProperties
  delay: number
  children: ReactNode
  from?: Record<string, number>
  className?: string
  idle?: boolean
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={style}
      initial={from}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: idle ? [0, -6, 0, 6, 0] : 0 }}
      transition={{
        ...bouncySpring,
        delay,
        rotate: idle ? { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.6 } : bouncySpring,
      }}
    >
      {children}
    </motion.div>
  )
}

/** Cỡ chữ tên khách tự co theo độ dài để không đè lên ảnh */
function nameSize(name: string): string {
  const n = Array.from(name).length
  if (n <= 10) return '11cqw'
  if (n <= 14) return '9cqw'
  if (n <= 20) return '7cqw'
  return '5.6cqw'
}

const serifCaps: CSSProperties = { fontFamily: 'var(--font-serif)', letterSpacing: '0.12em' }

/** Step 6: Thiệp hoàn chỉnh – dựng lại theo mẫu "LỄ TỐT NGHIỆP" */
export function InvitationStep({ name, onReplay }: { name: string; onReplay: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(sideConfetti, 900)
    return () => clearTimeout(t)
  }, [])

  const save = async () => {
    if (!cardRef.current || saving) return
    setSaving(true)
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `thiep-moi-tot-nghiep-${name.replace(/\s+/g, '-')}.png`
      a.click()
    } catch (err) {
      console.error(err)
      alert('Không lưu được ảnh, bạn thử chụp màn hình giúp mình nha 🥲')
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
        initial={{ opacity: 0, scale: 0.85, rotate: -4, y: 40 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
        transition={{ duration: 1, ease: easeOutExpo }}
        className="w-[min(94vw,460px)]"
      >
        {/* ===== THIỆP ===== */}
        <div
          ref={cardRef}
          className="paper-card relative w-full overflow-hidden"
          style={{
            aspectRatio: '726 / 1024',
            containerType: 'inline-size',
            boxShadow: '0 30px 60px -25px rgba(31,42,92,0.45), 0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* THÂN MỜI BẠN ĐẾN THAM DỰ  (2 vạch kép hai bên) */}
          <Piece style={{ top: '2.2%', left: 0, right: 0 }} delay={0.2} from={{ opacity: 0, y: -10 }}>
            <div className="flex items-center gap-[3cqw] text-ink/80">
              <div className="flex flex-1 flex-col gap-[0.6cqw]">
                <div className="h-px bg-brown/50" />
                <div className="h-px bg-brown/50" />
              </div>
              <span className="font-semibold whitespace-nowrap" style={{ ...serifCaps, fontSize: '3cqw' }}>
                THÂN MỜI BẠN ĐẾN THAM DỰ
              </span>
              <div className="flex flex-1 flex-col gap-[0.6cqw]">
                <div className="h-px bg-brown/50" />
                <div className="h-px bg-brown/50" />
              </div>
            </div>
          </Piece>

          {/* LỄ TỐT NGHIỆP */}
          <Piece style={{ top: '5.6%', left: 0, right: 0 }} delay={0.4} from={{ opacity: 0, y: 20, scale: 0.95 }}>
            <h2 className="text-center leading-none font-semibold text-[#454545]" style={{ ...serifCaps, fontSize: '10.2cqw', letterSpacing: '0.08em' }}>
              LỄ TỐT NGHIỆP
            </h2>
          </Piece>

          {/* Ảnh khung giấy xé */}
          <Piece style={{ top: '14.5%', left: '9.5%', width: '83%', height: '44%' }} delay={0.6} from={{ opacity: 0, scale: 0.9, rotate: -3 }}>
            <TornPhoto src={campus} alt="Khuôn viên trường" className="h-full w-full" style={{ transform: 'rotate(-1deg)' }} seed={11} />
          </Piece>
          <Piece style={{ top: '13.2%', right: '2.5%', width: '11%' }} delay={1.1} from={{ opacity: 0, scale: 0 }} idle>
            <CrownSticker style={{ transform: 'rotate(10deg)' }} />
          </Piece>

          {/* Ảnh tách nền lớn bên phải, mờ dần xuống dưới */}
          <Piece style={{ top: '36.5%', right: '-3%', height: '64%' }} delay={1} from={{ opacity: 0, x: 60 }}>
            <img
              src={cutout}
              alt={EVENT.host}
              className="h-full w-auto object-contain"
              draggable={false}
              style={{
                maskImage: 'linear-gradient(180deg, #000 55%, rgba(0,0,0,0.35) 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(180deg, #000 55%, rgba(0,0,0,0.35) 80%, transparent 100%)',
              }}
            />
          </Piece>

          {/* Xin chào, mình là Hà Tố Trinh */}
          <Piece style={{ top: '31.5%', left: 0, width: '42%' }} delay={1.2} from={{ opacity: 0, x: -60 }}>
            <PaperNote className="px-[3cqw] py-[2.4cqw] text-center" style={{ background: 'linear-gradient(160deg, rgba(239,230,210,0.96), rgba(228,216,190,0.96))' }}>
              <p className="text-ink" style={{ fontSize: '3.4cqw' }}>
                Xin chào, mình là
              </p>
              <p className="font-script leading-tight font-bold text-brown" style={{ fontSize: '6.4cqw' }}>
                {EVENT.host}
              </p>
            </PaperNote>
          </Piece>
          <Piece style={{ top: '28%', left: '1%', width: '9%' }} delay={1.4} from={{ opacity: 0, scale: 0 }} idle>
            <HeartSticker style={{ transform: 'rotate(-12deg)' }} />
          </Piece>

          {/* THÂN MỜI + tên khách */}
          <Piece style={{ top: '60.5%', left: '3%', width: '82%' }} delay={1.6} from={{ opacity: 0, y: 20 }}>
            <div className="flex flex-col items-center text-center">
              <span className="font-semibold text-ink" style={{ ...serifCaps, fontSize: '4.6cqw' }}>
                THÂN MỜI
              </span>
              <HandwrittenText
                delay={2.3}
                duration={1.5}
                className="font-script leading-tight font-bold text-[#c0392b]"
                style={{ fontSize: nameSize(name), maxWidth: '100%', overflowWrap: 'anywhere' }}
              >
                {name}
              </HandwrittenText>
            </div>
          </Piece>

          <Piece style={{ top: '61%', left: '2%', width: '16%' }} delay={1.8} from={{ opacity: 0, x: -30 }}>
            <ArrowHeartSticker />
          </Piece>
          <Piece style={{ top: '73.5%', right: '9%', width: '6%' }} delay={2} from={{ opacity: 0, scale: 0 }} idle>
            <OutlineStar />
          </Piece>

          {/* Ảnh nhỏ góc trái dưới */}
          <Piece style={{ top: '74.5%', left: '3%', height: '13.5%' }} delay={2.1} from={{ opacity: 0, scale: 0.5 }}>
            <img src={cutout} alt="" className="h-full w-auto object-contain" style={{ transform: 'scaleX(-1) rotate(-4deg)' }} draggable={false} />
          </Piece>

          {/* Thông tin */}
          <Piece style={{ top: '78.5%', left: '19%', right: '3%' }} delay={2.3} from={{ opacity: 0, y: 20 }}>
            <div className="grid grid-cols-[auto_auto_1fr] items-center gap-[3cqw] text-ink" style={{ ...serifCaps, letterSpacing: '0.08em' }}>
              <div className="text-center leading-relaxed" style={{ fontSize: '2.8cqw' }}>
                <p>{EVENT.weekday.toUpperCase()}</p>
                <p>{EVENT.date}</p>
                <p>{EVENT.time}</p>
              </div>
              <div className="h-[15cqw] w-px bg-brown/60" />
              <div className="text-center leading-relaxed" style={{ fontSize: '2.8cqw' }}>
                <p>{EVENT.school.toUpperCase()}</p>
                <p>306 VÕ VĂN HÁT, LONG TRƯỜNG</p>
                <p>HỒ CHÍ MINH</p>
              </div>
            </div>
          </Piece>
        </div>
      </motion.div>

      {/* ===== NÚT HÀNH ĐỘNG ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
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
      <p className="mt-6 text-center font-script text-2xl text-brown/80">Hẹn gặp {name} nha! 💐</p>
    </motion.section>
  )
}
