import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import cutout from '../../assets/trinh-cutout.png'
import { EVENT } from '../../config/event'
import { bouncySpring, fadeUp, pageVariants, popIn, stagger } from '../../lib/motion'
import { HandwrittenText } from '../ui/Paper'
import { CrownSticker, HeartSticker, OutlineStar, StarSticker } from '../ui/Stickers'

const TITLE = 'Lễ Tốt Nghiệp'.split(' ')

/** Step 3: Chào mừng đến lễ tốt nghiệp của Tố Trinh */
export function WelcomeStep({ onNext }: { onNext: () => void }) {
  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowBtn(true), 2600)
    const t2 = setTimeout(onNext, 9000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onNext])

  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pt-10"
    >
      {/* Sticker bay vào */}
      <motion.div variants={stagger(0.15, 1.2)} initial="hidden" animate="show" className="pointer-events-none absolute inset-0">
        <motion.div variants={popIn} className="absolute top-[9%] left-[8%] w-12 -rotate-12">
          <HeartSticker />
        </motion.div>
        <motion.div variants={popIn} className="absolute top-[12%] right-[10%] w-14 rotate-12">
          <CrownSticker />
        </motion.div>
        <motion.div variants={popIn} className="absolute top-[42%] left-[6%] w-8">
          <StarSticker />
        </motion.div>
        <motion.div variants={popIn} className="absolute right-[8%] bottom-[30%] w-9">
          <OutlineStar />
        </motion.div>
      </motion.div>

      <motion.div variants={stagger(0.12, 0.3)} initial="hidden" animate="show" className="relative z-10 text-center">
        <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.35em] text-brown uppercase sm:text-sm">
          Chào mừng bạn đến với
        </motion.p>
        <h1 className="mt-3 font-serif text-[2.6rem] leading-tight font-semibold text-ink sm:text-6xl">
          {TITLE.map((w, i) => (
            <motion.span key={i} variants={fadeUp} className="mr-[0.25em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>
        <motion.p variants={fadeUp} className="mt-2 text-lg text-ink/70 italic">
          của
        </motion.p>
        <div className="mt-1">
          <HandwrittenText delay={1.3} duration={1.6} className="font-script text-6xl text-crimson sm:text-7xl">
            {EVENT.hostShort}
          </HandwrittenText>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 160, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, type: 'spring', stiffness: 70, damping: 14 }}
        className="relative z-0 mt-4 drop-shadow-[0_15px_20px_rgba(31,42,92,0.25)]"
      >
        <img
          src={cutout}
          alt={EVENT.host}
          draggable={false}
          className="h-[36dvh] w-auto object-contain"
          style={{ maskImage: 'linear-gradient(180deg, #000 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(180deg, #000 80%, transparent 100%)' }}
        />
      </motion.div>

      <div className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] z-20 h-12">
        {showBtn && (
          <motion.button initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={bouncySpring} onClick={onNext} className="btn">
            Tiếp tục <span aria-hidden>→</span>
          </motion.button>
        )}
      </div>
    </motion.section>
  )
}
