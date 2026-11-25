import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Download, Menu, X } from 'lucide-react'
import { nav, profile } from '../data/content.js'

export default function Navbar() {
  const ref = useRef(null)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(ref.current, { y: -40, autoAlpha: 0, duration: 1, ease: 'power3.out', delay: 0.9 })
      })
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => setScrolled(self.scroll() > 24),
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  // Highlight the nav link of the section crossing the middle of the viewport
  useEffect(() => {
    const ids = ['top', ...nav.map((n) => n.id)]
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'top' ? '' : e.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header ref={ref} className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-3xl items-center justify-between gap-2 rounded-full border py-2 pl-4 pr-2 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? 'border-white/10 bg-ink-850/75 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]'
            : 'border-white/[0.06] bg-ink-850/40'
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-ember-400/40 bg-ember-400/10 font-serif text-base italic text-sand-50 transition-transform duration-500 group-hover:rotate-[360deg]">
            gv
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-sand-50 sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                  active === item.id ? 'text-sand-50' : 'text-sand-400 hover:text-sand-50'
                }`}
              >
                {active === item.id && <span className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]" />}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-full bg-sand-50 px-4 py-2 text-sm font-medium text-ink-900 transition-colors duration-300 hover:bg-ember-300"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Resume</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-sand-100 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`mx-auto mt-2 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-ink-850/90 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? 'max-h-80 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <ul className="p-3">
          {nav.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-lg text-sand-50 hover:bg-white/5"
              >
                {item.label}
                <span className="font-mono text-xs text-sand-500">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
