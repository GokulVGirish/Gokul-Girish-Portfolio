export default function SectionHeading({ index, eyebrow, title, accent, children }) {
  return (
    <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p data-reveal className="label mb-4 flex items-center gap-3">
          <span className="text-ember-400">{index}</span>
          <span className="h-px w-8 bg-white/15" />
          {eyebrow}
        </p>
        <h2
          data-reveal
          className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-sand-50 sm:text-5xl md:text-6xl"
        >
          {title} {accent && <span className="font-serif font-normal italic text-ember-300">{accent}</span>}
        </h2>
      </div>
      {children && (
        <p data-reveal className="max-w-sm text-sm leading-relaxed text-sand-400 md:text-right">
          {children}
        </p>
      )}
    </header>
  )
}
