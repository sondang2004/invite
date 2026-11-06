import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useAnimate } from 'motion/react'
import { logGuestToSheet } from '../../config/event'
import { fadeUp, pageVariants, popIn, stagger } from '../../lib/motion'
import { PaperNote } from '../ui/Paper'
import { GradCap, HeartSticker } from '../ui/Stickers'

/** Step 4: Bạn tên là gì nhỉ? */
export function AskNameStep({ initialName, onSubmit }: { initialName: string; onSubmit: (name: string) => void }) {
  const [value, setValue] = useState(initialName)
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState('')
  const [scope, animate] = useAnimate()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const name = value.trim().replace(/\s+/g, ' ')
    if (!name) {
      setError('Cho mình biết tên bạn với nha 🥺')
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
      <motion.div variants={stagger(0.15, 0.2)} initial="hidden" animate="show" className="flex w-full max-w-sm flex-col items-center">
        <motion.div variants={popIn} className="mb-2 w-20">
          <GradCap />
        </motion.div>

        <motion.div variants={fadeUp} className="w-full">
          <PaperNote tape className="-rotate-2 px-6 pt-8 pb-6 text-center">
            <HeartSticker className="absolute -top-4 -right-3 w-10 rotate-12" />
            <p className="font-script text-4xl text-brown sm:text-5xl">Bạn tên là gì nhỉ?</p>
            <p className="mt-2 text-sm text-ink/60">để mình viết tên bạn lên thiệp nha ✍️</p>
          </PaperNote>
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
              className="w-full bg-transparent pb-2 text-center font-script text-4xl text-navy outline-none placeholder:font-sans placeholder:text-base placeholder:text-ink/35"
            />
            <div className="absolute bottom-0 left-0 h-px w-full bg-ink/20" />
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-crimson"
              initial={false}
              animate={{ scaleX: focused || value ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-2 h-5 text-center text-sm text-crimson">
            {error && (
              <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                {error}
              </motion.span>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="btn">
              Mở thiệp của mình <span aria-hidden>💌</span>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </motion.section>
  )
}

