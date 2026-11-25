import { useRef } from 'react'
import { gsap } from 'gsap'
import { Briefcase, GraduationCap } from 'lucide-react'
import { timeline } from '../data/content.js'
import SectionHeading from './ui/SectionHeading.jsx'
import { useReveal, spotlight } from '../hooks/useReveal.js'

export default function Experience() {
  const root = useRef(null)

  useReveal(root, () => {
    // Draw the timeline rail as you scroll
    gsap.fromTo(
      '.rail-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.rail', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      },
    )
    gsap.utils.toArray('.rail-dot', root.current).forEach((dot) => {
      gsap.from(dot, {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(3)',
        scrollTrigger: { trigger: dot, start: 'top 75%' },
      })
    })
  })

  return (
    <section id="experience" ref={root} className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="03" eyebrow="Experience & education" title="The journey" accent="so far.">
          Mathematics trained the thinking; production FinTech work sharpened the craft.
        </SectionHeading>

        <ol className="rail relative ml-3 md:ml-0 md:pl-[calc(220px+2.5rem)]">
          {/* rail */}
          <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-white/10 md:left-[220px]" />
          <span
            aria-hidden
            className="rail-fill absolute bottom-2 left-0 top-2 w-px origin-top bg-gradient-to-b from-ember-300 via-ember-500 to-ember-600/0 md:left-[220px]"
          />

          {timeline.map((item, i) => {
            const Icon = item.type === 'education' ? GraduationCap : Briefcase
            return (
              <li key={item.title} className={`relative pl-10 md:pl-0 ${i < timeline.length - 1 ? 'pb-14' : ''}`}>
                {/* dot */}
                <span className="rail-dot absolute left-0 top-1.5 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-ember-400/40 bg-ink-900 text-ember-300 md:left-[-2.5rem]">
                  <Icon className="h-3.5 w-3.5" />
                </span>

                {/* period (left column on desktop) */}
                <p
                  data-reveal
                  className="label mb-3 md:absolute md:left-[calc(-220px-2.5rem)] md:top-2 md:mb-0 md:w-[190px] md:text-right"
                >
                  {item.period}
                </p>

                <article
                  data-reveal
                  onPointerMove={spotlight}
                  className="spotlight glass rounded-3xl p-6 shadow-card transition-colors duration-500 hover:border-ember-400/25 sm:p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl font-medium text-sand-50 sm:text-2xl">{item.title}</h3>
                    <span className="font-mono text-xs text-sand-500">0{i + 1}</span>
                  </div>
                  <p className="mt-1 text-sand-300">
                    {item.org} <span className="text-sand-500">· {item.place}</span>
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-sand-400">
                        <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-ember-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
