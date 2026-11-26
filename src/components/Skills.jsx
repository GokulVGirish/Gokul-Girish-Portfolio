import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronDown, Move } from 'lucide-react'
import { orbitRings, skillGroups } from '../data/content.js'
import SectionHeading from './ui/SectionHeading.jsx'
import { useReveal } from '../hooks/useReveal.js'

/* Ring radii as a fraction of the usable half-width */
const RING_FRAC = [0.45, 0.72, 1]

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Flatten rings into planets with evenly spread starting angles. */
const PLANETS = orbitRings.flatMap((ring, r) =>
  ring.tools.map((tool, i) => ({
    ...tool,
    ring: r,
    id: `${r}-${i}`,
    base: (i / ring.tools.length) * Math.PI * 2 + r * 0.9,
  })),
)

export default function Skills() {
  const root = useRef(null)
  const stage = useRef(null)
  const planetEls = useRef({})
  const ringEls = useRef([])
  const core = useRef(null)

  // animation state kept out of React so the orbit never re-renders per frame
  const sim = useRef({
    rot: orbitRings.map(() => 0),
    vel: 0,
    spin: 1,
    tilt: 0.5,
    tiltTarget: 0.5,
    baseTilt: 0.5,
    w: 0,
    h: 0,
    compact: false,
    inView: false,
    reduced: false,
    drag: { down: false, x: 0, moved: 0, captured: false },
    hovered: null,
    selected: '0-0',
  })

  const [selected, setSelected] = useState('0-0')
  const [focusRing, setFocusRing] = useState(null)
  const [compact, setCompact] = useState(false)
  const [height, setHeight] = useState(440)
  const [showAll, setShowAll] = useState(false)

  useReveal(root)

  const tool = PLANETS.find((p) => p.id === selected)
  const ring = orbitRings[tool.ring]

  useEffect(() => {
    sim.current.selected = selected
  }, [selected])

  /* Size: radii follow the stage width; small screens look more top-down. */
  useEffect(() => {
    const s = sim.current
    s.reduced = reducedMotion()
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      const isCompact = w < 560
      s.w = w
      s.compact = isCompact
      s.baseTilt = isCompact ? 0.62 : 0.5
      s.tiltTarget = s.baseTilt
      const outer = (w / 2 - (isCompact ? 24 : 58)) * RING_FRAC[RING_FRAC.length - 1]
      const h = Math.round(outer * 2 * (s.baseTilt + 0.09) + (isCompact ? 80 : 120))
      s.h = h
      setHeight(h)
      setCompact(isCompact)
    })
    ro.observe(stage.current)
    const io = new IntersectionObserver(([e]) => (s.inView = e.isIntersecting), { threshold: 0.05 })
    io.observe(stage.current)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  /* Frame loop */
  useEffect(() => {
    const s = sim.current
    const tick = () => {
      if (!s.inView || !s.w) return
      const dt = gsap.ticker.deltaRatio(60) / 60
      if (!s.drag.down) {
        const auto = s.reduced ? 0 : 1
        orbitRings.forEach((r, i) => (s.rot[i] += r.speed * dt * s.spin * auto + s.vel * (1 - i * 0.12)))
        s.vel *= 0.93
      }
      s.spin += ((s.hovered ? 0.12 : 1) - s.spin) * 0.08
      s.tilt += (s.tiltTarget - s.tilt) * 0.06

      const cx = s.w / 2
      const cy = s.h / 2
      const half = s.w / 2 - (s.compact ? 24 : 58)

      RING_FRAC.forEach((f, i) => {
        const el = ringEls.current[i]
        if (!el) return
        el.setAttribute('cx', cx)
        el.setAttribute('cy', cy)
        el.setAttribute('rx', half * f)
        el.setAttribute('ry', half * f * s.tilt)
      })
      if (core.current) gsap.set(core.current, { x: cx, y: cy })

      for (const p of PLANETS) {
        const el = planetEls.current[p.id]
        if (!el) continue
        const R = half * RING_FRAC[p.ring]
        const a = p.base + s.rot[p.ring]
        const depth = Math.sin(a) // -1 = far side, 1 = near side
        const near = (depth + 1) / 2
        const lit = p.id === s.selected || p.id === s.hovered
        el.style.transform = `translate3d(${cx + R * Math.cos(a)}px, ${cy + R * Math.sin(a) * s.tilt}px, 0) translate(-50%, -50%) scale(${(0.64 + 0.36 * near).toFixed(3)})`
        el.style.zIndex = depth < 0 ? String(Math.round(near * 9) + 1) : String(Math.round(near * 9) + 20)
        el.style.opacity = lit ? '1' : (0.3 + 0.7 * near).toFixed(3)
      }
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  /* Drag to spin (horizontal), tilt with the cursor */
  const onDown = (e) => {
    const d = sim.current.drag
    d.down = true
    d.x = e.clientX
    d.moved = 0
    d.captured = false
  }
  const onMove = (e) => {
    const s = sim.current
    if (e.pointerType === 'mouse') {
      const r = stage.current.getBoundingClientRect()
      s.tiltTarget = s.baseTilt + ((e.clientY - r.top) / r.height - 0.5) * 0.16
    }
    const d = s.drag
    if (!d.down) return
    const dx = e.clientX - d.x
    d.x = e.clientX
    d.moved += Math.abs(dx)
    if (d.moved > 5 && !d.captured) {
      stage.current.setPointerCapture(e.pointerId)
      d.captured = true
    }
    if (d.captured) {
      const step = dx * 0.006
      s.rot = s.rot.map((v) => v + step)
      s.vel = step
    }
  }
  const onUp = () => {
    sim.current.drag.down = false
  }
  const onLeave = () => {
    sim.current.tiltTarget = sim.current.baseTilt
  }

  const pick = (id) => {
    if (sim.current.drag.moved > 5) return // it was a drag, not a click
    setSelected(id)
  }
  const hover = (id) => (e) => {
    if (e.pointerType !== 'mouse') return
    sim.current.hovered = id
  }

  return (
    <section id="skills" ref={root} className="container-x py-24 md:py-32">
      <SectionHeading index="02" eyebrow="My stack" title="Tools I use to" accent="ship.">
        Everything I build with, in orbit. Drag to spin it, and pick a planet to see what I use it for.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-10">
        {/* Orbit stage */}
        <div
          data-reveal
          ref={stage}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onLeave}
          className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing"
          style={{ height }}
          aria-label="Orbit of the tools I use"
        >
          {/* soft backdrop glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500/[0.07] blur-3xl" />

          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {RING_FRAC.map((_, i) => {
              const on = focusRing === i || tool.ring === i
              return (
                <ellipse
                  key={i}
                  ref={(el) => (ringEls.current[i] = el)}
                  fill="none"
                  stroke={on ? orbitRings[i].color : 'rgba(246,240,230,0.09)'}
                  strokeOpacity={on ? 0.55 : 1}
                  strokeWidth={on ? 1.2 : 1}
                  strokeDasharray={i === RING_FRAC.length - 1 ? '2 6' : undefined}
                  style={{ transition: 'stroke .4s, stroke-opacity .4s' }}
                />
              )
            })}
          </svg>

          {/* core */}
          <div ref={core} className="pointer-events-none absolute left-0 top-0 z-[15]" aria-hidden>
            <div
              className={`relative -translate-x-1/2 -translate-y-1/2 ${compact ? 'h-14 w-14' : 'h-20 w-20'}`}
            >
              <span className="absolute -inset-6 rounded-full bg-ember-400/20 blur-2xl" />
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-ember-400/20" />
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fbe2bf,#efab62_45%,#c97632_75%,#7a4317)] shadow-[0_0_40px_6px_rgba(239,171,98,0.35)]" />
              <span className="absolute inset-0 grid place-items-center font-mono text-sm font-semibold text-ink-900/80">
                &lt;/&gt;
              </span>
            </div>
          </div>

          {/* planets */}
          {PLANETS.map((p) => {
            const on = p.id === selected
            const color = orbitRings[p.ring].color
            return (
              <button
                key={p.id}
                ref={(el) => (planetEls.current[p.id] = el)}
                onClick={() => pick(p.id)}
                onPointerEnter={hover(p.id)}
                onPointerLeave={hover(null)}
                aria-pressed={on}
                aria-label={p.name}
                className="absolute left-0 top-0 will-change-transform"
              >
                <span
                  className={`flex items-center gap-1.5 rounded-full border font-mono backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-300 ${
                    compact ? 'h-9 w-9 justify-center text-[10px]' : 'px-3 py-1.5 text-[12px]'
                  } ${
                    on
                      ? 'border-ember-400/70 bg-ember-400/20 text-sand-50 shadow-glow'
                      : 'border-white/10 bg-ink-800/85 text-sand-300 hover:border-white/25 hover:text-sand-50'
                  }`}
                >
                  {!compact && <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />}
                  {compact ? p.abbr : p.name}
                </span>
              </button>
            )
          })}

          <span className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-sand-500">
            <Move className="h-3 w-3" /> drag to spin
          </span>
        </div>

        {/* Detail panel */}
        <div data-reveal className="glass rounded-[28px] p-6 shadow-card sm:p-7">
          <div key={selected} className="orbit-fade">
            <p className="label flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: ring.color }} />
              {ring.name} orbit
            </p>
            <h3 className="mt-3 font-serif text-5xl italic leading-none text-sand-50">{tool.name}</h3>
            <p className="mt-4 min-h-[3.5rem] text-[15px] leading-relaxed text-sand-400">{tool.note}</p>
          </div>

          <div className="mt-6 border-t border-white/[0.07] pt-5">
            <p className="label mb-3 text-[10px]">Same orbit</p>
            <div className="flex flex-wrap gap-2">
              {PLANETS.filter((p) => p.ring === tool.ring).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`chip transition-colors ${p.id === selected ? 'border-ember-400/50 text-sand-50' : 'hover:border-white/25 hover:text-sand-50'}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {orbitRings.map((r, i) => (
              <button
                key={r.name}
                onClick={() => setSelected(`${i}-0`)}
                onPointerEnter={() => setFocusRing(i)}
                onPointerLeave={() => setFocusRing(null)}
                className={`flex items-center rounded-xl border px-3 py-2 text-left text-[12.5px] transition-colors ${
                  tool.ring === i ? 'border-white/15 bg-white/[0.04] text-sand-50' : 'border-white/[0.06] text-sand-400 hover:text-sand-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                  {r.name}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="mt-5 flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-sand-400 transition-colors hover:text-sand-50"
          >
            Full stack list
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-out"
            style={{ gridTemplateRows: showAll ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="space-y-4 pt-4">
                {skillGroups.map((g) => (
                  <div key={g.title}>
                    <p className="mb-2 text-[12px] text-sand-300">{g.title}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
