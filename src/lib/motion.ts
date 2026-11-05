import type { Transition, Variants } from 'motion/react'

export const softSpring: Transition = { type: 'spring', stiffness: 120, damping: 16 }
export const bouncySpring: Transition = { type: 'spring', stiffness: 260, damping: 16 }
export const easeOutExpo = [0.22, 1, 0.36, 1] as const

/** Chuyển cảnh giữa các step */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeOutExpo } },
  exit: { opacity: 0, y: -24, filter: 'blur(8px)', transition: { duration: 0.45, ease: 'easeIn' } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: softSpring },
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -35 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: bouncySpring },
}

