import { useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight, Lock } from 'lucide-react'
import { projects, miniProjects } from '../data/content.js'
import SectionHeading from './ui/SectionHeading.jsx'
import ProjectVisual from './ProjectVisual.jsx'
import { GithubIcon } from './ui/BrandIcons.jsx'
import { useReveal, spotlight } from '../hooks/useReveal.js'

function LinkButton({ href, children, primary }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group/link inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
        primary
          ? 'bg-sand-50 text-ink-900 hover:bg-ember-300'
          : 'border border-white/10 text-sand-100 hover:border-ember-400/50 hover:bg-ember-400/10'
      }`}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  )
}

function ProjectCard({ p, flip }) {
  const visual = useRef(null)

  // Tilt + layered parallax on hover (desktop pointers only)
  const onMove = (e) => {
    spotlight(e)
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    const r = visual.current.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    gsap.to(visual.current, { rotationY: nx * 6, rotationX: -ny * 6, duration: 0.6, ease: 'power3.out' })
    gsap.to(visual.current.querySelectorAll('.pv-layer'), { x: nx * 10, y: ny * 10, duration: 0.6 })
    gsap.to(visual.current.querySelectorAll('.pv-layer-2'), { x: nx * 22, y: ny * 22, duration: 0.6 })
  }
  const onLeave = () => {
    gsap.to(visual.current, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' })
    gsap.to(visual.current.querySelectorAll('.pv-layer, .pv-layer-2'), { x: 0, y: 0, duration: 0.8 })
  }

  return (
    <article
      data-reveal
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="project-card spotlight glass group grid gap-8 overflow-hidden rounded-[28px] p-5 shadow-card transition-colors duration-500 hover:border-ember-400/25 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8"
    >
      {/* Visual */}
      <div className={`relative ${flip ? 'lg:order-2' : ''}`} style={{ perspective: 900 }}>
        <div className={`absolute -inset-6 -z-10 bg-gradient-to-br ${p.accent} blur-2xl`} />
        <div ref={visual} className="aspect-[4/3] w-full [transform-style:preserve-3d]">
          <ProjectVisual project={p} />
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-col justify-center">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-serif text-5xl italic leading-none text-ember-400/80">{p.id}</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`w-fit rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                p.type?.startsWith('Professional')
                  ? 'bg-ember-400/15 text-ember-300 ring-1 ring-ember-400/30'
                  : 'bg-white/5 text-sand-400 ring-1 ring-white/10'
              }`}
            >
              {p.type}
            </span>
            <span className="label">{p.kicker}</span>
          </div>
        </div>
        <h3 className="text-3xl font-medium tracking-tight text-sand-50 sm:text-4xl">{p.name}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-sand-400">{p.description}</p>
        <ul className="mt-5 space-y-2">
          {p.impact.map((line) => (
            <li key={line} className="flex gap-3 text-sm text-sand-300">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ember-400" />
              {line}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="chip transition-colors duration-300 group-hover:border-white/15">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {p.internal && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-sand-400">
              <Lock className="h-3.5 w-3.5" /> Internal platform · walkthrough on request
            </span>
          )}
          <LinkButton href={p.live} primary>
            Live Demo
          </LinkButton>
          {p.github && (
            <LinkButton href={p.github}>
              <GithubIcon className="h-4 w-4" /> {p.githubBackend ? 'Frontend' : 'GitHub'}
            </LinkButton>
          )}
          {p.githubBackend && (
            <LinkButton href={p.githubBackend}>
              <GithubIcon className="h-4 w-4" /> Backend
            </LinkButton>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const root = useRef(null)
  useReveal(root, () => {
    gsap.utils.toArray('.project-card', root.current).forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 0.96 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 55%', scrub: true } },
      )
    })
  })

  return (
    <section id="projects" ref={root} className="container-x py-24 md:py-32">
      <SectionHeading index="04" eyebrow="Featured work" title="Selected" accent="projects.">
        Production lending software, company sites, full-stack commerce and real-time systems.
      </SectionHeading>

      <div className="flex flex-col gap-6 md:gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} flip={i % 2 === 1} />
        ))}
      </div>

      <h3 data-reveal className="label mb-6 mt-20">
        More builds
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {miniProjects.map((m) => (
          <a
            key={m.name}
            href={m.github}
            target="_blank"
            rel="noreferrer"
            data-reveal
            onPointerMove={spotlight}
            className="spotlight glass group flex flex-col rounded-3xl p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-ember-400/25 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-xl font-medium text-sand-50">{m.name}</h4>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-sand-300 transition-all duration-500 group-hover:rotate-45 group-hover:border-ember-400/50 group-hover:text-ember-300">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-sand-400">{m.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <GithubIcon className="mr-1 h-4 w-4 text-sand-500" />
              {m.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
