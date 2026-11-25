import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/**
 * Fades + lifts every [data-reveal] element inside `scope` as it scrolls into view.
 * Elements entering together are staggered via ScrollTrigger.batch.
 */
export function useReveal(scope, extra) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray('[data-reveal]', scope.current)
        gsap.set(items, { autoAlpha: 0, y: 32 })
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.08,
              overwrite: true,
            }),
        })
        extra?.()
      })
      return () => mm.revert()
    },
    { scope },
  )
}

/** Updates --mx/--my CSS vars so .spotlight cards glow under the cursor. */
export function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
