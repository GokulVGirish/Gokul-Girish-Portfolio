import { useRef } from 'react'
import { Landmark, Layers, Server } from 'lucide-react'
import { pillars } from '../data/content.js'
import SectionHeading from './ui/SectionHeading.jsx'
import { useReveal, spotlight } from '../hooks/useReveal.js'

const icons = { Landmark, Layers, Server }

export default function About() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="about" ref={root} className="container-x py-24 md:py-32">
      <SectionHeading index="01" eyebrow="What I do" title="Full stack, with" accent="FinTech depth.">
        I take features from database schema to the last pixel, and I care about how both ends feel to use.
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => {
          const Icon = icons[p.icon]
          return (
            <article
              key={p.title}
              data-reveal
              onPointerMove={spotlight}
              className="spotlight glass group relative flex flex-col overflow-hidden rounded-3xl p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-ember-400/25"
            >
              <span className="pointer-events-none absolute -right-4 -top-6 font-serif text-[120px] italic leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-ember-400/10">
                {i + 1}
              </span>
              <span className="mb-8 grid h-12 w-12 place-items-center rounded-2xl border border-ember-400/25 bg-ember-400/10 text-ember-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="text-2xl font-medium tracking-tight text-sand-50">{p.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-sand-400">{p.text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
