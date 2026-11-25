import { marquee } from '../data/content.js'

export default function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div
      aria-hidden
      className="relative border-y border-white/[0.06] bg-ink-950/40 py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-2xl font-medium tracking-tight text-sand-500 sm:text-3xl">
            <span className={i % 3 === 1 ? 'font-serif font-normal italic text-sand-300' : ''}>{t}</span>
            <span className="text-ember-500/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
