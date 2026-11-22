import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EVENT } from '../../config/event'
import { burstConfetti } from '../effects/confetti'
import { HandwrittenText, Typewriter } from '../ui/Paper'
import { GoldDivider, GradCap, GraduationCrest } from '../ui/Stickers'

type Scene = { duration: number; render: (name: string) => ReactNode }

const sceneMotion = {
  initial: { opacity: 0, scale: 1.04 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.45 } },
}

const MILESTONES = [
  { code: '01', label: 'HÀNH TRÌNH', title: 'Đại học Bách khoa TP.HCM', accent: 'text-bk-blue' },
  { code: '02', label: 'NỖ LỰC', title: 'Những đêm chạy đồ án & deadline', accent: 'text-gold-light' },
  { code: '03', label: 'CỘT MỐC 2026', title: 'Sẵn sàng cho chương mới', accent: 'text-gold' },
] as const

const SCENES: Scene[] = [
  // 1. Xin chào {tên}
  {
    duration: 4200,
    render: (name) => (
      <div className="noir-bg flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 0.8 }}
          className="text-xs font-semibold text-bk-blue uppercase"
        >
          Welcome
        </motion.p>
        <p className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
          <Typewriter text="Xin chào," delay={0.25} speed={0.07} />
        </p>
        <p className="gold-text mt-2 font-script text-6xl font-bold sm:text-7xl">
          <Typewriter text={name} delay={0.95} speed={0.08} />
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    ),
  },
  // 2. Hành trình Bách khoa – Kinetic Blueprint
  {
    duration: 5000,
    render: () => (
      <div className="noir-bg relative flex h-full flex-col items-center justify-center overflow-hidden px-5 text-center">
        {/* Số năm nền khổng lồ trượt chậm */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.08, scale: 1.08 }}
          transition={{ duration: 5, ease: 'linear' }}
          className="pointer-events-none absolute font-serif text-[32vw] leading-none font-bold tracking-tighter text-gold select-none"
        >
          2026
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 flex flex-col items-center"
        >
          <span className="rounded-full border border-bk-blue/40 bg-bk-deep/30 px-4 py-1 text-[11px] font-semibold tracking-[0.35em] text-bk-blue uppercase">
            HCMUT · CHAPTER COMPLETED
          </span>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 font-serif text-[clamp(1.15rem,5vw,1.9rem)] leading-snug whitespace-nowrap text-ivory"
          >
            Sau những năm tháng thanh xuân
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.8 }}
            className="gold-text mt-2 font-serif text-[clamp(1.25rem,5.5vw,2.2rem)] font-bold tracking-wide whitespace-nowrap"
          >
            dưới mái trường Bách khoa TP.HCM…
          </motion.p>
          <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 180 }} transition={{ delay: 2, duration: 0.8 }} className="mt-6">
            <GoldDivider />
          </motion.div>
        </motion.div>
      </div>
    ),
  },
  // 3. Cột mốc thành tựu (không dùng ảnh – thẻ dark glass ánh kim bay vào)
  {
    duration: 6000,
    render: () => (
      <div className="noir-bg relative flex h-full flex-col items-center justify-center overflow-hidden px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.15 }}
          className="mb-5"
        >
          <GraduationCrest className="h-24 w-24 drop-shadow-[0_0_24px_rgba(228,190,106,0.3)]" />
        </motion.div>

        <div className="flex w-full max-w-sm flex-col gap-3">
          {MILESTONES.map((m, idx) => (
            <motion.div
              key={m.code}
              initial={{ x: idx % 2 === 0 ? -120 : 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 85, damping: 15, delay: 0.45 + idx * 0.55 }}
              className="noir-card flex items-center gap-4 rounded-lg border border-gold/30 px-4 py-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
            >
              <span className={`font-serif text-2xl font-bold ${m.accent}`}>{m.code}</span>
              <div className="h-8 w-px bg-gold/25" />
              <div className="text-left">
                <p className="text-[10px] font-semibold tracking-[0.3em] text-muted uppercase">{m.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-ivory sm:text-base">{m.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.7 }}
          className="mt-7 text-center font-serif text-[clamp(1.05rem,4.6vw,1.875rem)] whitespace-nowrap text-ivory"
        >
          …cuối cùng mình cũng <span className="gold-text font-bold">tốt nghiệp</span> rồi! 🎓
        </motion.p>
      </div>
    ),
  },
  // 4. Tung mũ ánh kim + confetti + lời mời
  {
    duration: 5200,
    render: (name) => <CapTossScene name={name} />,
  },
]

function CapTossScene({ name }: { name: string }) {
  useEffect(() => {
    const t = setTimeout(burstConfetti, 700)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="noir-bg flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
      <motion.div
        initial={{ y: 260, rotate: 0, opacity: 0 }}
        animate={{ y: [260, -90, -24], rotate: [0, 540, 720], opacity: 1 }}
        transition={{ duration: 1.4, times: [0, 0.6, 1], ease: 'easeOut' }}
        className="w-28"
      >
        <GradCap style={{ filter: 'drop-shadow(0 12px 24px rgba(228,190,106,0.45))' }} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
        className="font-serif text-[clamp(1.2rem,5vw,1.875rem)] leading-snug whitespace-nowrap text-ivory/90"
      >
        Và {EVENT.hostShort} rất muốn mời
      </motion.p>
      <div className="my-2">
        <HandwrittenText delay={1.55} duration={1.2} className="gold-text font-script text-6xl font-bold sm:text-7xl">
          {name}
        </HandwrittenText>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.35, duration: 0.7 }}
        className="font-serif text-[clamp(1.15rem,5vw,1.875rem)] whitespace-nowrap text-ivory/90"
      >
        đến chung vui cùng mình! 🥂
      </motion.p>
    </div>
  )
}

/** Step 5: chuỗi cảnh chuyển động typography & motion graphics, chạm để tua */
export function StoryStep({ name, onDone }: { name: string; onDone: () => void }) {
  const [index, setIndex] = useState(0)
  const finished = index >= SCENES.length

  useEffect(() => {
    if (finished) return
    const t = setTimeout(() => setIndex((i) => i + 1), SCENES[index].duration)
    return () => clearTimeout(t)
  }, [index, finished])

  const next = () => !finished && setIndex((i) => i + 1)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-20 cursor-pointer overflow-hidden select-none"
      onClick={next}
    >
      <AnimatePresence>
        {!finished && (
          <motion.div key={index} {...sceneMotion} className="absolute inset-0">
            {SCENES[index].render(name)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thanh tiến trình kiểu story */}
      <div className="absolute inset-x-0 top-0 z-30 flex gap-1.5 px-4 pt-[max(0.9rem,env(safe-area-inset-top))]">
        {SCENES.map((s, i) => (
          <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-bk-blue to-gold"
              initial={{ scaleX: i < index ? 1 : 0 }}
              animate={{ scaleX: i < index ? 1 : i === index ? 1 : 0 }}
              transition={i === index ? { duration: s.duration / 1000, ease: 'linear' } : { duration: 0 }}
            />
          </div>
        ))}
      </div>
      {!finished && (
        <p className="hint-pulse absolute inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 text-center text-xs tracking-[0.2em] text-ivory/70 uppercase">
          chạm để tiếp tục
        </p>
      )}

      {/* Chuyển cảnh mượt sang thiệp */}
      {finished && (
        <motion.div
          className="absolute inset-0 z-40 bg-[#070b14]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeIn' }}
          onAnimationComplete={onDone}
        />
      )}
    </motion.section>
  )
}
