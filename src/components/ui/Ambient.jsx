import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

/** Top scroll-progress bar + a soft warm light that follows the cursor (desktop). */
export default function Ambient() {
  const bar = useRef(null)
  const glow = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
    )

    const mm = gsap.matchMedia()
    mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(glow.current, { autoAlpha: 1 })
      const x = gsap.quickTo(glow.current, 'x', { duration: 0.9, ease: 'power3.out' })
      const y = gsap.quickTo(glow.current, 'y', { duration: 0.9, ease: 'power3.out' })
      const move = (e) => {
        x(e.clientX)
        y(e.clientY)
      }
      window.addEventListener('pointermove', move)
      return () => window.removeEventListener('pointermove', move)
    })
    return () => mm.revert()
  })

  return (
    <>
      <div
        ref={bar}
        aria-hidden
        className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-ember-600 via-ember-400 to-ember-300"
      />
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full opacity-0 [background:radial-gradient(circle,rgba(239,171,98,0.07),transparent_60%)]"
      />
    </>
  )
}
