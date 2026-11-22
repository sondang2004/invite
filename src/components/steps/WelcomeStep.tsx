import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { EVENT } from '../../config/event'
import { bouncySpring, fadeUp, pageVariants, popIn, stagger } from '../../lib/motion'
import { GoldDivider, GraduationCrest } from '../ui/Stickers'

const TITLE = 'LỄ TỐT NGHIỆP'.split(' ')

/** Step 3: Màn chào mừng phong cách nam tính – không dùng ảnh, dùng huy hiệu & typography sắc nét */
export function WelcomeStep({ onNext }: { onNext: () => void }) {
  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowBtn(true), 2300)
    const t2 = setTimeout(onNext, 8500)
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
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-12"
    >
      {/* Vòng sáng mờ phía sau */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.28), rgba(228,190,106,0.16) 55%, transparent 75%)' }}
      />

      <motion.div variants={stagger(0.14, 0.2)} initial="hidden" animate="show" className="relative z-10 flex max-w-md flex-col items-center text-center">
        {/* Huy hiệu tốt nghiệp lục giác */}
        <motion.div variants={popIn} className="relative mb-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute h-40 w-40 rounded-full border border-dashed border-gold/25"
          />
          <GraduationCrest className="h-32 w-32 drop-shadow-[0_0_24px_rgba(228,190,106,0.28)]" />
        </motion.div>

        <motion.p variants={fadeUp} className="text-[11px] font-semibold tracking-[0.4em] text-bk-blue uppercase sm:text-xs">
          Chào mừng bạn đến với
        </motion.p>

        <h1 className="mt-3 font-serif text-[2.4rem] leading-tight font-bold tracking-[0.08em] text-ivory sm:text-5xl">
          {TITLE.map((w, i) => (
            <motion.span key={i} variants={fadeUp} className="mr-[0.25em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div variants={fadeUp} className="my-4 w-52">
          <GoldDivider />
        </motion.div>

        <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] text-muted uppercase">
          của
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="gold-text mt-2 font-serif text-3xl font-bold tracking-[0.1em] uppercase sm:text-5xl"
        >
          {EVENT.host}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-midnight/70 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-ivory/90 uppercase backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-bk-blue" />
          {EVENT.school}
        </motion.p>
      </motion.div>

      <div className="mt-12 h-12">
        {showBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={bouncySpring}
            onClick={onNext}
            className="btn"
          >
            Tiếp tục <span aria-hidden>→</span>
          </motion.button>
        )}
      </div>
    </motion.section>
  )
}
