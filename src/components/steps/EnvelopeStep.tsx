import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { motion, useAnimate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { EVENT } from '../../config/event'
import { easeOutExpo, pageVariants } from '../../lib/motion'

/**
 * Step 1 + 2: Phong bì đen lì viền vàng ánh kim → bấm mở → con dấu kim loại bật mở → nắp lật 3D → rút thiệp VIP.
 */
export function EnvelopeStep({ onOpened }: { onOpened: () => void }) {
  const [scope, animate] = useAnimate()
  const [opening, setOpening] = useState(false)
  const busy = useRef(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 15 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 150, damping: 15 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (busy.current) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const resetTilt = () => {
    mx.set(0)
    my.set(0)
  }

  async function open() {
    if (busy.current) return
    busy.current = true
    setOpening(true)
    resetTilt()

    animate('.env-hint', { opacity: 0, y: 10 }, { duration: 0.3 })
    await animate('.env-seal', { scale: [1, 1.25, 0], rotate: [0, -10, 35], opacity: [1, 1, 0] }, { duration: 0.55, ease: 'easeInOut' })
    await animate(
      '.env-flap',
      { rotateX: [0, 180], transformPerspective: [900, 900] },
      { duration: 0.85, ease: [0.65, 0, 0.35, 1] },
    )
    animate('.env-flap', { zIndex: 5 }, { duration: 0 })
    await animate('.env-card', { y: '-62%' }, { type: 'spring', bounce: 0.32, duration: 1 })
    await new Promise((r) => setTimeout(r, 350))
    animate('.env-part', { y: 160, opacity: 0 }, { duration: 0.6, ease: 'easeIn' })
    await animate(
      '.env-card',
      { y: '-10%', scale: 3.2, opacity: [1, 1, 0] },
      { duration: 1, ease: easeOutExpo, opacity: { duration: 1, times: [0, 0.6, 1] } },
    )
    onOpened()
  }

  useEffect(() => {
    if (import.meta.env.VITE_SHOT && new URLSearchParams(window.location.search).has('autoopen')) open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.section
      ref={scope}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-10 px-6 py-12"
    >
      <div className="env-hint text-center">
        <p className="text-[11px] font-semibold tracking-[0.42em] text-bk-blue uppercase">HCMUT · CLASS OF 2026</p>
        <p className="mt-2 font-serif text-3xl font-semibold tracking-wide text-ivory sm:text-4xl">Bạn có một lời mời</p>
        <p className="mt-1.5 text-xs tracking-[0.28em] text-gold/80 uppercase">từ {EVENT.host}</p>
      </div>

      <motion.div
        animate={opening ? { y: 0 } : { y: [0, -8, 0] }}
        transition={opening ? { duration: 0.3 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-14"
      >
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Mở thiệp"
          onClick={open}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
          onPointerMove={onMove}
          onPointerLeave={resetTilt}
          whileHover={opening ? undefined : { scale: 1.03 }}
          whileTap={opening ? undefined : { scale: 0.97 }}
          style={{ rotateX, rotateY, transformPerspective: 1100 }}
          className="relative cursor-pointer outline-none select-none"
        >
          <div className="relative" style={{ width: 'min(84vw, 380px)', aspectRatio: '100 / 70' }}>
            {/* Ánh sáng phát ra dưới phong bì */}
            <div
              className="env-part absolute -bottom-8 left-1/2 h-8 w-[88%] -translate-x-1/2 rounded-[50%]"
              style={{ background: 'radial-gradient(ellipse, rgba(228,190,106,0.28), rgba(56,189,248,0.12) 45%, transparent 72%)', filter: 'blur(6px)' }}
            />

            {/* Mặt sau phong bì (lót xanh navy ánh kim) */}
            <div
              className="env-part absolute inset-0 rounded-md border border-gold/30"
              style={{
                zIndex: 0,
                background: 'linear-gradient(160deg, #0f1b38 0%, #172a54 55%, #0c1428 100%)',
                boxShadow: '0 28px 60px -20px rgba(0,0,0,0.85)',
              }}
            >
              <div
                className="absolute inset-0 rounded-md opacity-25"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #e4be6a 0 1px, transparent 1px 11px)' }}
              />
            </div>

            {/* Tấm thiệp VIP bên trong */}
            <div
              className="env-card noir-card absolute top-[5%] right-[6%] left-[6%] h-[90%] rounded-sm border border-gold/55"
              style={{ zIndex: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.55)', willChange: 'transform' }}
            >
              <div className="absolute inset-[5%] flex flex-col items-center justify-start rounded-sm border border-gold/30 pt-[7%] text-center">
                <span className="text-[9px] font-semibold tracking-[0.42em] text-bk-blue uppercase">◆ INVITATION ◆</span>
                <span className="gold-text mt-1.5 font-serif text-xl font-bold tracking-[0.14em] sm:text-2xl">LỄ TỐT NGHIỆP</span>
                <span className="mt-1 text-xs font-medium tracking-[0.22em] text-ivory/80 uppercase">{EVENT.host}</span>
              </div>
            </div>

            {/* Vạt trái / phải / dưới (đen lì carbon viền vàng) */}
            <div className="env-part pointer-events-none absolute inset-0" style={{ zIndex: 20 }}>
              <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="pk-l" x1="0" x2="1">
                    <stop offset="0" stopColor="#141c30" />
                    <stop offset="1" stopColor="#0d1323" />
                  </linearGradient>
                  <linearGradient id="pk-r" x1="1" x2="0">
                    <stop offset="0" stopColor="#141c30" />
                    <stop offset="1" stopColor="#0d1323" />
                  </linearGradient>
                  <linearGradient id="pk-b" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0" stopColor="#182238" />
                    <stop offset="1" stopColor="#0e1526" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 52,38 0,70" fill="url(#pk-l)" stroke="rgba(228,190,106,0.22)" strokeWidth="0.35" />
                <polygon points="100,0 48,38 100,70" fill="url(#pk-r)" stroke="rgba(228,190,106,0.22)" strokeWidth="0.35" />
                <polygon points="0,70 50,33 100,70" fill="url(#pk-b)" stroke="rgba(228,190,106,0.35)" strokeWidth="0.4" />
              </svg>
              <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <span className="text-[11px] font-medium tracking-[0.34em] text-gold/85 uppercase">Special Guest</span>
              </div>
            </div>

            {/* Nắp phong bì – lật 3D */}
            <div
              className="env-flap preserve-3d absolute top-0 left-0 h-[56%] w-full"
              style={{ zIndex: 30, transformOrigin: '50% 0%', transform: 'perspective(900px) rotateX(0deg)' }}
            >
              {/* Mặt ngoài */}
              <div
                className="backface-hidden absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(180deg, #1b2640 0%, #101729 100%)',
                  filter: 'drop-shadow(0 5px 8px rgba(0,0,0,0.55))',
                }}
              />
              {/* Viền chữ V vàng mảnh */}
              <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="backface-hidden pointer-events-none absolute inset-0 h-full w-full">
                <polyline points="0.5,0.5 50,55.5 99.5,0.5" fill="none" stroke="rgba(228,190,106,0.55)" strokeWidth="0.6" />
              </svg>
              {/* Mặt trong (lót ánh kim xanh đậm) */}
              <div
                className="backface-hidden absolute inset-0"
                style={{
                  transform: 'rotateX(180deg)',
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
                  background: 'linear-gradient(0deg, #1e3a8a 0%, #0f1b38 100%)',
                }}
              />
            </div>

            {/* Con dấu kim loại vàng ĐCS */}
            <div
              className="env-seal absolute top-[56%] left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:h-[74px] sm:w-[74px]"
              style={{
                zIndex: 40,
                background: 'radial-gradient(circle at 32% 28%, #fce7aa 0%, #d4a748 52%, #855e18 100%)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.65), 0 0 18px rgba(228,190,106,0.35), inset 0 -3px 6px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.45)',
              }}
            >
              <div className="grid h-[78%] w-[78%] place-items-center rounded-full border border-[#0b1120]/45 bg-gradient-to-br from-[#141d33] to-[#080c16]">
                <span className="gold-text font-serif text-base font-bold tracking-wider sm:text-lg">
                  {EVENT.hostInitials}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <p className="env-hint hint-pulse text-xs font-medium tracking-[0.28em] text-gold/80 uppercase">Chạm vào phong bì để mở</p>
    </motion.section>
  )
}
