import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { motion, useAnimate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { EVENT } from '../../config/event'
import { easeOutExpo, pageVariants } from '../../lib/motion'

const NAVY = '#1f2a5c'

/**
 * Step 1 + 2: Phong bì đóng → bấm vào → dấu sáp vỡ → nắp lật 3D → thiệp trượt ra → zoom vào thiệp.
 * Lưu ý: container tilt KHÔNG dùng preserve-3d để z-index giữa các lớp hoạt động ổn định
 * (nắp tự có perspective riêng qua transformPerspective).
 */
export function EnvelopeStep({ onOpened }: { onOpened: () => void }) {
  const [scope, animate] = useAnimate()
  const [opening, setOpening] = useState(false)
  const busy = useRef(false)

  // Tilt nhẹ theo con trỏ / ngón tay
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
    // 1. Dấu sáp phồng lên rồi vỡ
    await animate('.env-seal', { scale: [1, 1.25, 0], rotate: [0, -8, 30], opacity: [1, 1, 0] }, { duration: 0.55, ease: 'easeInOut' })
    // 2. Nắp lật 3D quanh mép trên
    await animate(
      '.env-flap',
      { rotateX: [0, 180], transformPerspective: [900, 900] },
      { duration: 0.85, ease: [0.65, 0, 0.35, 1] },
    )
    // Nắp đã nằm phía trên → đưa ra sau thiệp
    animate('.env-flap', { zIndex: 5 }, { duration: 0 })
    // 3. Thiệp trượt lên, có độ nảy
    await animate('.env-card', { y: '-62%' }, { type: 'spring', bounce: 0.35, duration: 1 })
    await new Promise((r) => setTimeout(r, 350))
    // 4. Phong bì rơi xuống, zoom vào thiệp
    animate('.env-part', { y: 160, opacity: 0 }, { duration: 0.6, ease: 'easeIn' })
    await animate(
      '.env-card',
      { y: '-10%', scale: 3.2, opacity: [1, 1, 0] },
      { duration: 1, ease: easeOutExpo, opacity: { duration: 1, times: [0, 0.6, 1] } },
    )
    onOpened()
  }

  // Chỉ dùng khi chụp ảnh kiểm thử: ?autoopen=1
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
        <p className="font-script text-3xl text-brown sm:text-4xl">Bạn có một lá thư mới</p>
        <p className="mt-1 text-sm tracking-[0.25em] text-ink/60 uppercase">từ {EVENT.hostShort} 💌</p>
      </div>

      <motion.div
        animate={opening ? { y: 0 } : { y: [0, -8, 0] }}
        transition={opening ? { duration: 0.3 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-16"
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
            {/* Bóng đổ */}
            <div
              className="env-part absolute -bottom-8 left-1/2 h-6 w-[85%] -translate-x-1/2 rounded-[50%]"
              style={{ background: 'radial-gradient(ellipse, rgba(31,42,92,0.35), transparent 70%)', filter: 'blur(4px)' }}
            />

            {/* Mặt sau phong bì (lót bên trong) */}
            <div
              className="env-part absolute inset-0 rounded-md"
              style={{
                zIndex: 0,
                background: `linear-gradient(180deg, #8c1426 0%, #a8182f 100%)`,
                boxShadow: '0 25px 50px -20px rgba(31,42,92,0.55)',
              }}
            >
              <div
                className="absolute inset-0 rounded-md opacity-30"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 10px)' }}
              />
            </div>

            {/* Tấm thiệp bên trong */}
            <div
              className="env-card paper-card absolute top-[5%] right-[6%] left-[6%] h-[90%] rounded-sm"
              style={{ zIndex: 10, boxShadow: '0 4px 14px rgba(0,0,0,0.18)', willChange: 'transform' }}
            >
              <div className="absolute inset-[5%] flex flex-col items-center rounded-sm border border-brown/30 pt-[6%] text-center">
                <span className="text-[10px] tracking-[0.4em] text-brown uppercase">✦ Graduation 2026 ✦</span>
                <span className="mt-1 font-serif text-2xl font-semibold tracking-wide text-ink sm:text-3xl">LỄ TỐT NGHIỆP</span>
                <span className="font-script text-3xl text-crimson sm:text-4xl">{EVENT.host}</span>
              </div>
            </div>

            {/* Vạt trái / phải / dưới (che thiệp) */}
            <div className="env-part pointer-events-none absolute inset-0" style={{ zIndex: 20 }}>
              <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="pk-l" x1="0" x2="1">
                    <stop offset="0" stopColor="#24316b" />
                    <stop offset="1" stopColor="#1c2655" />
                  </linearGradient>
                  <linearGradient id="pk-r" x1="1" x2="0">
                    <stop offset="0" stopColor="#24316b" />
                    <stop offset="1" stopColor="#1c2655" />
                  </linearGradient>
                  <linearGradient id="pk-b" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0" stopColor="#2a3876" />
                    <stop offset="1" stopColor="#222d63" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 52,38 0,70" fill="url(#pk-l)" />
                <polygon points="100,0 48,38 100,70" fill="url(#pk-r)" />
                <polygon points="0,70 50,33 100,70" fill="url(#pk-b)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
              </svg>
              <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <span className="font-script text-lg text-gold/90 sm:text-xl">Gửi bạn thân mến,</span>
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
                  background: `linear-gradient(180deg, #2b3a7c 0%, ${NAVY} 100%)`,
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
                }}
              />
              {/* Mặt trong (lót đỏ) */}
              <div
                className="backface-hidden absolute inset-0"
                style={{
                  transform: 'rotateX(180deg)',
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
                  background: 'linear-gradient(0deg, #b51a33 0%, #8c1426 100%)',
                }}
              />
            </div>

            {/* Dấu sáp */}
            <div
              className="env-seal absolute top-[56%] left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:h-[72px] sm:w-[72px]"
              style={{
                zIndex: 40,
                background: 'radial-gradient(circle at 35% 30%, #e0384f 0%, #b3112a 55%, #7d0b1d 100%)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.35), inset 0 -3px 6px rgba(0,0,0,0.3), inset 0 3px 5px rgba(255,255,255,0.25)',
              }}
            >
              <div className="grid h-[76%] w-[76%] place-items-center rounded-full border-2 border-[#f3c3a0]/50">
                <span className="font-serif text-xl font-bold text-[#f8d9b4]" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.4)' }}>
                  {EVENT.hostInitials}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <p className="env-hint hint-pulse text-sm font-medium tracking-wide text-navy/80">Chạm vào phong bì để mở ✨</p>
    </motion.section>
  )
}
