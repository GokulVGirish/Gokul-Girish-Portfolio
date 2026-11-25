import { useRef, useState } from 'react'
import { Cloud, Database, Layers, Server, ShieldCheck } from 'lucide-react'
import { skillGroups } from '../data/content.js'
import SectionHeading from './ui/SectionHeading.jsx'
import { useReveal, spotlight } from '../hooks/useReveal.js'

const icons = { Layers, Server, Database, Cloud, ShieldCheck }

export default function Skills() {
  const root = useRef(null)
  const [hovered, setHovered] = useState(null)
  useReveal(root)

  return (
    <section id="skills" ref={root} className="container-x py-24 md:py-32">
      <SectionHeading index="02" eyebrow="My stack" title="Tools I use to" accent="ship.">
        From pixel-perfect, animated interfaces to secure APIs and the cloud they run on.
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-6">
        {skillGroups.map((group, gi) => {
          const Icon = icons[group.icon]
          const span = gi < 2 ? 'md:col-span-3' : 'md:col-span-2'
          return (
            <article
              key={group.title}
              data-reveal
              onPointerMove={spotlight}
              className={`spotlight glass group rounded-3xl p-6 shadow-card transition-colors duration-500 hover:border-ember-400/25 sm:p-7 ${span}`}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ember-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-lg font-medium text-sand-50">{group.title}</h3>
                </div>
                <span className="font-mono text-xs text-sand-500">{String(group.items.length).padStart(2, '0')}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const dim = hovered && hovered !== item
                  return (
                    <li key={item}>
                      <span
                        onPointerEnter={() => setHovered(item)}
                        onPointerLeave={() => setHovered(null)}
                        className={`inline-flex cursor-default items-center rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300 ${
                          hovered === item
                            ? '-translate-y-0.5 border-ember-400/60 bg-ember-400/15 text-sand-50 shadow-glow'
                            : 'border-white/[0.08] bg-white/[0.03] text-sand-300'
                        } ${dim ? 'opacity-50' : ''}`}
                      >
                        {item}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
