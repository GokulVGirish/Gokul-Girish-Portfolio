import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDown, ArrowUpRight, MapPin, Mail } from 'lucide-react'
import { profile, stats } from '../data/content.js'
import Magnetic from './ui/Magnetic.jsx'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons.jsx'

export default function Hero() {
  const root = useRef(null)
  const portraitWrap = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ---- Entrance timeline ----
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.from('.hero-line > span', { yPercent: 110, duration: 1.2, stagger: 0.1 })
          .from('.hero-fade', { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.08 }, '-=0.8')
          .from(
            '.hero-portrait',
            { clipPath: 'inset(100% 0% 0% 0% round 28px)', scale: 1.08, duration: 1.4, ease: 'expo.out' },
            0.15,
          )
          .from('.hero-glow', { autoAlpha: 0, scale: 0.6, duration: 1.8, ease: 'power2.out' }, 0.3)
          .from('.hero-stat', { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.07 }, '-=1')

        // Count-up stats
        gsap.utils.toArray('.stat-num', root.current).forEach((el) => {
          const obj = { v: 0 }
          gsap.to(obj, {
            v: Number(el.dataset.to),
            duration: 1.8,
            delay: 1.1,
            ease: 'power2.out',
            onUpdate: () => (el.textContent = Math.round(obj.v)),
          })
        })

        // ---- Idle float + breathing glow ----
        gsap.to('.hero-float', { y: -12, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        gsap.to('.hero-glow', { scale: 1.08, opacity: 0.85, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 })

        // ---- Scroll parallax ----
        gsap.to('.hero-parallax', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-copy', {
          yPercent: -8,
          autoAlpha: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'center center', end: 'bottom top', scrub: true },
        })
      })

      // ---- Pointer parallax (desktop only) ----
      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const el = portraitWrap.current
        const rx = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' })
        const ry = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' })
        const gx = gsap.quickTo('.hero-glow', 'x', { duration: 1.2, ease: 'power3.out' })
        const gy = gsap.quickTo('.hero-glow', 'y', { duration: 1.2, ease: 'power3.out' })
        const move = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          rx(nx * 8)
          ry(-ny * 8)
          gx(nx * 40)
          gy(ny * 40)
        }
        window.addEventListener('pointermove', move)
        return () => window.removeEventListener('pointermove', move)
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      {/* Background: warm radial light + faint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-ember-500/[0.07] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,240,220,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,240,220,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* ---------- Copy ---------- */}
        <div className="hero-copy order-2 lg:order-1">
          <p className="hero-fade label mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 normal-case tracking-normal text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
              Open to new opportunities
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
            </span>
          </p>

          <h1 className="text-[13vw] font-medium leading-[0.92] tracking-[-0.04em] text-sand-50 sm:text-7xl lg:text-[5.6rem]">
            <span className="hero-line block overflow-hidden pb-1">
              <span className="block">Full-Stack</span>
            </span>
            <span className="hero-line block overflow-hidden pb-2">
              <span className="block">
                <span className="font-serif font-normal italic text-ember-300">Developer</span>
                <span className="text-ember-400">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-6 text-lg text-sand-300 sm:text-xl">
            Hi, I’m <span className="text-sand-50">{profile.name}</span>. {profile.tagline}
          </p>
          <p className="hero-fade mt-4 max-w-xl text-[15px] leading-relaxed text-sand-400">{profile.summary}</p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#projects" className="btn-primary group">
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost">
                <Mail className="h-4 w-4" /> Contact Me
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full text-sand-400 transition-colors hover:bg-white/5 hover:text-sand-50"
              >
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full text-sand-400 transition-colors hover:bg-white/5 hover:text-sand-50"
              >
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* Status block */}
          <dl className="hero-fade glass mt-10 grid max-w-xl divide-y divide-white/[0.06] rounded-2xl text-sm">
            {profile.status.map((s) => (
              <div key={s.label} className="grid grid-cols-[96px_1fr] gap-4 px-5 py-3">
                <dt className="label pt-0.5">{s.label}</dt>
                <dd className="text-sand-100">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------- Portrait ---------- */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="hero-parallax relative w-[78%] max-w-[420px] sm:w-[60%] lg:w-full" style={{ perspective: 1000 }}>
            <div className="hero-glow absolute inset-x-[8%] top-[6%] -z-10 aspect-square rounded-full bg-[radial-gradient(circle,rgba(239,171,98,0.42),rgba(232,149,74,0.08)_55%,transparent_70%)] blur-2xl" />
            <div className="hero-float">
              <div ref={portraitWrap} className="relative [transform-style:preserve-3d]">
                <div className="hero-portrait relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-ink-700 via-ink-800 to-ink-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                  {/* studio backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(239,171,98,0.18),transparent_60%)]" />
                  <picture>
                    <source srcSet={profile.portrait} type="image/webp" />
                    <img
                      src={profile.portraitFallback}
                      alt={`Portrait of ${profile.name}`}
                      width="1254"
                      height="1254"
                      fetchpriority="high"
                      className="relative mx-auto aspect-[4/5] w-full object-cover object-top pt-6"
                    />
                  </picture>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                    <div>
                      <p className="font-serif text-2xl italic leading-none text-sand-50">{profile.firstName}</p>
                      <p className="label mt-1.5">Software Engineer</p>
                    </div>
                    <span className="chip hidden whitespace-nowrap border-ember-400/30 bg-ember-400/10 text-ember-300 sm:inline-flex">Full-Stack · FinTech</span>
                  </div>
                </div>
                {/* floating badge */}
                {/* <div className="glass absolute -left-4 top-10 hidden rounded-2xl px-4 py-3 shadow-card sm:block [transform:translateZ(40px)]">
                  <p className="label">Backend</p>
                  <p className="text-sm text-sand-50">Node.js · Express · PostgreSQL</p>
                </div>
                <div className="glass absolute -right-3 top-[68%] hidden rounded-2xl px-4 py-3 shadow-card sm:block [transform:translateZ(60px)]">
                  <p className="label">Frontend</p>
                  <p className="text-sm text-sand-50">React · Next.js · GSAP</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="container-x mt-16 lg:mt-20">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="hero-stat bg-ink-900 px-5 py-6">
              <p className="text-3xl font-medium tracking-tight text-sand-50 sm:text-4xl">
                <span className="stat-num" data-to={s.value}>
                  {s.value}
                </span>
                <span className="text-ember-400">{s.suffix}</span>
              </p>
              <p className="mt-1 text-xs text-sand-400 sm:text-sm">{s.label}</p>
            </li>
          ))}
        </ul>
        <a href="#skills" className="label mt-10 hidden items-center gap-2 transition-colors hover:text-sand-50 md:inline-flex">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" /> Scroll
        </a>
      </div>
    </section>
  )
}
