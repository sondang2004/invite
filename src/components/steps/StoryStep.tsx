import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import campus from '../../assets/trinh-campus.jpg'
import cutout from '../../assets/trinh-cutout.png'
import { EVENT } from '../../config/event'
import { burstConfetti } from '../effects/confetti'
import { HandwrittenText, Typewriter } from '../ui/Paper'
import { GradCap, HeartSticker, StarSticker } from '../ui/Stickers'

type Scene = { duration: number; render: (name: string) => ReactNode }

const sceneMotion = {
  initial: { opacity: 0, scale: 1.04 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.5 } },
}

const SCENES: Scene[] = [
  // 1. Xin chào {tên}
  {
    duration: 3000,
    render: (name) => (
      <div className="paper flex h-full flex-col items-center justify-center px-8 text-center">
        <motion.span initial={{ rotate: 0 }} animate={{ rotate: [0, 18, -8, 18, 0] }} transition={{ delay: 0.3, duration: 1.2 }} className="text-6xl">
          👋
        </motion.span>
        <p className="mt-6 font-serif text-3xl text-ink sm:text-4xl">
          <Typewriter text="Xin chào" delay={0.2} speed={0.07} />
        </p>
        <p className="mt-1 font-script text-6xl text-crimson sm:text-7xl">
          <Typewriter text={name} delay={0.9} speed={0.08} />
        </p>
      </div>
    ),
  },
  // 2. Ảnh sân trường – Ken Burns
  {
    duration: 3600,
    render: () => (
      <div className="relative h-full overflow-hidden bg-navy">
        <motion.img
          src={campus}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.05, y: 0 }}
          animate={{ scale: 1.22, y: -20 }}
          transition={{ duration: 4.2, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-8 pb-[18%] text-center text-cream">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="font-serif text-2xl leading-snug sm:text-3xl">
            Sau những năm tháng thanh xuân
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-1 font-script text-4xl text-gold">
            dưới mái trường {EVENT.schoolShort}…
          </motion.p>
        </div>
      </div>
    ),
  },
  // 3. Polaroid xếp chồng
  {
    duration: 3400,
    render: () => (
      <div className="paper relative flex h-full flex-col items-center justify-center overflow-hidden px-6">
        <div className="relative h-[46dvh] w-[min(80vw,340px)]">
          <motion.div
            initial={{ x: -300, rotate: -30, opacity: 0 }}
            animate={{ x: 0, rotate: -8, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.2 }}
            className="absolute top-0 left-0 w-[64%] bg-white p-2 pb-10 shadow-xl"
          >
            <img src={campus} alt="" className="aspect-[3/4] w-full object-cover" />
            <span className="absolute bottom-2 left-0 w-full text-center font-script text-lg text-ink/70">kỷ niệm ✿</span>
          </motion.div>
          <motion.div
            initial={{ x: 300, rotate: 30, opacity: 0 }}
            animate={{ x: 0, rotate: 7, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.6 }}
            className="absolute right-0 bottom-0 w-[58%] bg-white p-2 pb-10 shadow-xl"
          >
            <div className="flex aspect-[3/4] w-full items-end justify-center overflow-hidden bg-gradient-to-b from-[#dfe8f5] to-[#f3ead8]">
              <img src={cutout} alt="" className="h-[95%] w-auto object-contain" />
            </div>
            <span className="absolute bottom-2 left-0 w-full text-center font-script text-lg text-ink/70">class of 2026</span>
          </motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: 'spring' }} className="absolute top-[40%] right-[2%] w-10">
            <HeartSticker />
          </motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 20 }} transition={{ delay: 1.3, type: 'spring' }} className="absolute bottom-[8%] left-[6%] w-8">
            <StarSticker />
          </motion.div>
        </div>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }} className="mt-8 text-center font-serif text-2xl text-ink sm:text-3xl">
          …cuối cùng mình cũng <span className="text-crimson">tốt nghiệp</span> rồi! 🎓
        </motion.p>
      </div>
    ),
  },
  // 4. Tung mũ + confetti + lời mời
  {
    duration: 3800,
    render: (name) => <CapTossScene name={name} />,
  },
]

function CapTossScene({ name }: { name: string }) {
  useEffect(() => {
    const t = setTimeout(burstConfetti, 700)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-navy to-[#2c3a7c] px-8 text-center text-cream">
      <motion.div
        initial={{ y: 260, rotate: 0, opacity: 0 }}
        animate={{ y: [260, -90, -30], rotate: [0, 540, 720], opacity: 1 }}
        transition={{ duration: 1.4, times: [0, 0.6, 1], ease: 'easeOut' }}
        className="w-28"
      >
        <GradCap style={{ filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.4)) brightness(1.6)' }} />
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }} className="font-serif text-2xl leading-snug sm:text-3xl">
        Và mình rất muốn mời
      </motion.p>
      <div className="my-1">
        <HandwrittenText delay={1.6} duration={1.2} className="font-script text-6xl text-gold sm:text-7xl">
          {name}
        </HandwrittenText>
      </div>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.7 }} className="font-serif text-2xl sm:text-3xl">
        đến chung vui cùng mình! 💐
      </motion.p>
    </div>
  )
}

/** Step 5: chuỗi cảnh chuyển liên tục kiểu story, chạm để tua */
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
          <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-black/15">
            <motion.div
              className="h-full origin-left rounded-full bg-crimson/80"
              initial={{ scaleX: i < index ? 1 : 0 }}
              animate={{ scaleX: i < index ? 1 : i === index ? 1 : 0 }}
              transition={i === index ? { duration: s.duration / 1000, ease: 'linear' } : { duration: 0 }}
            />
          </div>
        ))}
      </div>
      {!finished && <p className="hint-pulse absolute inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 text-center text-xs text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">chạm để tiếp tục</p>}

      {/* Lóe sáng chuyển sang thiệp */}
      {finished && (
        <motion.div
          className="absolute inset-0 z-40 bg-[#fffdf8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeIn' }}
          onAnimationComplete={onDone}
        />
      )}
    </motion.section>
  )
}
