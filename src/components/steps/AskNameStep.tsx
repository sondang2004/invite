import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useAnimate } from 'motion/react'
import { logGuestToSheet } from '../../config/event'
import { fadeUp, pageVariants, popIn, stagger } from '../../lib/motion'
import { CornerBracket, GradCap } from '../ui/Stickers'

/** Step 4: Bạn tên là gì nhỉ? – phong cách VIP Pass tối màu ánh kim */
export function AskNameStep({ initialName, onSubmit }: { initialName: string; onSubmit: (name: string) => void }) {
  const [value, setValue] = useState(initialName)
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState('')
  const [scope, animate] = useAnimate()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const name = value.trim().replace(/\s+/g, ' ')
    if (!name) {
      setError('Nhập tên của bạn để mình ghi lên thiệp nha!')
      animate(scope.current, { x: [0, -10, 10, -8, 8, -4, 0] }, { duration: 0.45 })
      return
    }
    logGuestToSheet(name)
    onSubmit(name)
  }

  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6"
    >
      <motion.div variants={stagger(0.14, 0.15)} initial="hidden" animate="show" className="flex w-full max-w-sm flex-col items-center">
        <motion.div variants={popIn} className="mb-4 w-20">
          <GradCap className="drop-shadow-[0_6px_18px_rgba(228,190,106,0.35)]" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="noir-card relative w-full rounded-md border border-gold/30 px-6 py-7 text-center shadow-[0_24px_50px_-20px_rgba(0,0,0,0.85)]"
        >
          <CornerBracket className="absolute top-2 left-2 h-5 w-5" />
          <CornerBracket className="absolute top-2 right-2 h-5 w-5 rotate-90" />
          <CornerBracket className="absolute right-2 bottom-2 h-5 w-5 rotate-180" />
          <CornerBracket className="absolute bottom-2 left-2 h-5 w-5 -rotate-90" />

          <p className="text-[10px] font-semibold tracking-[0.38em] text-bk-blue uppercase">VIP Guest Check-in</p>
          <p className="gold-text mt-2 font-serif text-3xl font-bold tracking-wide sm:text-4xl">Bạn tên là gì nhỉ?</p>
          <p className="mt-2 text-xs tracking-wide text-muted">Nhập tên để khắc lên tấm thiệp mời của riêng bạn</p>
        </motion.div>

        <motion.form variants={fadeUp} onSubmit={submit} className="mt-10 w-full">
          <div ref={scope} className="relative">
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                if (error) setError('')
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              maxLength={30}
              placeholder="Nhập tên của bạn..."
              autoComplete="name"
              enterKeyHint="go"
              className="w-full bg-transparent pb-2.5 text-center font-serif text-3xl font-semibold tracking-wide text-ivory outline-none placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:tracking-widest placeholder:text-muted/60 placeholder:uppercase"
            />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gold/25" />
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-bk-blue via-gold to-gold-light"
              initial={false}
              animate={{ scaleX: focused || value ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-2.5 h-5 text-center text-xs font-medium text-gold-light">
            {error && (
              <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                {error}
              </motion.span>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="btn">
              Mở thiệp mời <span aria-hidden>→</span>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </motion.section>
  )
}
