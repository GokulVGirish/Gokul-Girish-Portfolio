// Abstract, code-drawn previews for each project.

function BrowserChrome({ url, children }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-950/80">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-0.5 font-mono text-[10px] text-sand-500">{url}</span>
      </div>
      <div className="relative h-[calc(100%-37px)]">{children}</div>
    </div>
  )
}

function Autovert() {
  return (
    <BrowserChrome url="autovert.in">
      <div className="pv-layer absolute inset-0 flex flex-col justify-center gap-4 p-6 sm:p-8">
        <span className="h-2 w-20 rounded-full bg-ember-400/60" />
        <p className="text-3xl font-semibold leading-none tracking-tight text-sand-50 sm:text-4xl">
          Engineered
          <br />
          <span className="font-serif font-normal italic text-ember-300">to perform.</span>
        </p>
        <div className="flex gap-2">
          <span className="h-7 w-24 rounded-full bg-sand-50/90" />
          <span className="h-7 w-20 rounded-full border border-white/15" />
        </div>
      </div>
      <div className="pv-layer-2 absolute bottom-5 right-5 hidden items-end gap-1.5 sm:flex">
        {[38, 62, 48, 80, 96].map((h, i) => (
          <span key={i} className="w-3 rounded-t bg-gradient-to-t from-ember-600/40 to-ember-300" style={{ height: h * 0.7 }} />
        ))}
      </div>
      <div className="pv-layer-2 absolute right-5 top-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] text-emerald-300">
        LCP 0.9s · CLS 0
      </div>
    </BrowserChrome>
  )
}

function Kalikaal() {
  const tiles = ['from-rose-300/40', 'from-amber-200/40', 'from-sand-300/30', 'from-ember-400/40', 'from-teal-300/30', 'from-rose-400/30']
  return (
    <BrowserChrome url="kalikaal / storefront">
      <div className="pv-layer grid h-full grid-cols-3 gap-3 p-5">
        {tiles.map((t, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className={`flex-1 rounded-xl bg-gradient-to-br ${t} to-white/[0.02]`} />
            <span className="h-1.5 w-3/4 rounded-full bg-white/15" />
            <span className="h-1.5 w-1/3 rounded-full bg-ember-400/50" />
          </div>
        ))}
      </div>
      <div className="pv-layer-2 glass absolute bottom-5 right-5 rounded-xl px-3 py-2 font-mono text-[10px] text-sand-300">
        BEGIN; UPDATE stock … COMMIT;
      </div>
    </BrowserChrome>
  )
}

function NamasteVibe() {
  return (
    <BrowserChrome url="namaste-vibe.vercel.app">
      <div className="pv-layer grid h-full grid-cols-2 gap-3 p-5">
        <div className="relative rounded-xl bg-gradient-to-br from-amber-300/25 to-ink-800">
          <span className="absolute left-1/2 top-[38%] h-10 w-10 -translate-x-1/2 rounded-full bg-white/15" />
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 font-mono text-[10px] text-sand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> you
          </span>
        </div>
        <div className="relative rounded-xl bg-gradient-to-br from-teal-300/20 to-ink-800">
          <span className="absolute left-1/2 top-[38%] h-10 w-10 -translate-x-1/2 rounded-full bg-white/15" />
          <span className="absolute bottom-3 left-3 font-mono text-[10px] text-sand-300">stranger</span>
        </div>
      </div>
      <div className="pv-layer-2 absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col gap-1.5">
        <span className="glass self-start rounded-full px-3 py-1 text-[11px] text-sand-100">namaste 👋</span>
        <span className="self-end rounded-full bg-ember-400/80 px-3 py-1 text-[11px] text-ink-900">hey there!</span>
      </div>
    </BrowserChrome>
  )
}


function GalaxyLOS() {
  const cards = [
    ['Unallocated', 'bg-sky-400/20 text-sky-300'],
    ['New', 'bg-emerald-400/20 text-emerald-300'],
    ['TAT', 'bg-rose-400/20 text-rose-300'],
    ['WIP', 'bg-violet-400/20 text-violet-300'],
  ]
  return (
    <BrowserChrome url="galaxy · loan origination system">
      <div className="pv-layer absolute inset-0 flex">
        {/* sidebar */}
        <div className="flex w-9 flex-col items-center gap-2.5 border-r border-white/[0.06] py-3">
          <span className="h-5 w-5 rounded-md bg-ember-400/40" />
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-3 w-3 rounded bg-white/10" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-sand-50 sm:text-base">Good evening!</p>
              <div className="mt-1.5 flex gap-3 font-mono text-[9px] text-sand-500">
                <span className="border-b border-ember-400 pb-0.5 text-ember-300">My Queue</span>
                <span>Pipeline</span>
                <span>Analysis</span>
              </div>
            </div>
            <span className="rounded-md bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/30 px-2.5 py-1 text-[10px] font-medium text-sand-50">
              Galaxy LOS
            </span>
          </div>
          <div className="grid flex-1 grid-cols-[1fr_1.1fr] gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              {cards.map(([label, tone]) => (
                <div key={label} className="flex flex-col justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                  <span className="text-[9px] text-sand-400">{label}</span>
                  <div className="flex items-end justify-between">
                    <span className="text-base font-semibold text-sand-50">0</span>
                    <span className={`h-4 w-4 rounded ${tone}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-gradient-to-br from-ember-300/70 via-rose-400/60 to-fuchsia-500/60 p-2.5 text-ink-900">
              <p className="text-[9px] font-medium opacity-80">Total · MTD</p>
              <p className="text-lg font-bold leading-tight sm:text-xl">₹4.26L</p>
              <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px]">
                {['App Creation', 'ABND', 'Disbursed', 'Rejected'].map((t, i) => (
                  <div key={t}>
                    <p className="opacity-75">{t}</p>
                    <div className="mt-0.5 h-1 rounded-full bg-ink-900/15">
                      <div className="h-1 rounded-full bg-ink-900/50" style={{ width: `${[45, 80, 15, 8][i]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            {[0, 1].map((r) => (
              <div key={r} className="flex items-center gap-2 rounded-md bg-white/[0.03] px-2 py-1.5">
                <span className="h-1.5 w-10 rounded-full bg-white/15" />
                <span className="h-1.5 w-16 rounded-full bg-white/10" />
                <span className="ml-auto rounded-full bg-ember-400/20 px-1.5 font-mono text-[8px] text-ember-300">
                  {r ? 'ABND' : 'APP CREATION'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pv-layer-2 glass absolute bottom-4 right-4 hidden rounded-xl px-3 py-1.5 font-mono text-[10px] text-sand-300 sm:block">
        lead → app → disbursal
      </div>
    </BrowserChrome>
  )
}

function CleanEnergy() {
  const products = [
    { t: 'Rooftop Solar', on: true },
    { t: 'E-2 Wheeler' },
    { t: 'E-3 Wheeler' },
  ]
  return (
    <BrowserChrome url="ecofy · green loan onboarding">
      <div className="pv-layer absolute inset-0 flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex gap-1.5">
          {products.map((p) => (
            <span
              key={p.t}
              className={`rounded-full px-2.5 py-1 text-[10px] ${
                p.on ? 'bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/40' : 'bg-white/[0.04] text-sand-400'
              }`}
            >
              {p.t}
            </span>
          ))}
        </div>
        {/* stepper */}
        <div className="flex items-center px-2">
          {['Basic', 'Company', 'Contact'].map((s, i) => (
            <div key={s} className={`flex items-center ${i < 2 ? 'flex-1' : ''}`}>
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold ${
                    i === 0 ? 'bg-sky-500 text-white' : 'bg-white/10 text-sand-400'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`text-[9px] ${i === 0 ? 'text-sky-300' : 'text-sand-500'}`}>{s}</span>
              </div>
              {i < 2 && <span className="mx-2 mb-4 h-px flex-1 bg-white/10" />}
            </div>
          ))}
        </div>
        {/* form card */}
        <div className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
          <p className="mb-2.5 text-[11px] font-medium text-sand-50">Basic Information</p>
          <div className="flex gap-2">
            <div className="flex-1 rounded-md border border-white/10 px-2 py-1.5 font-mono text-[9px] text-sand-500">PAN · XXXXX0000X</div>
            <span className="rounded-md bg-sky-500/80 px-2.5 py-1.5 text-[9px] font-medium text-white">Verify</span>
          </div>
          <div className="mt-2 rounded-md border border-white/10 px-2 py-1.5 text-[9px] text-sand-500">Type of company ▾</div>
          <div className="mt-3 flex justify-end">
            <span className="rounded-full bg-sky-500/80 px-3 py-1 text-[9px] font-medium text-white">Next →</span>
          </div>
        </div>
      </div>
      <div className="pv-layer-2 absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-1 text-[10px] text-emerald-300">
        ✓ PAN verified
      </div>
      <div className="pv-layer-2 glass absolute bottom-4 left-4 flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[14px]">
        <span title="Solar">☀️</span>
        <span title="E-2W">🛵</span>
        <span title="E-3W">🛺</span>
      </div>
    </BrowserChrome>
  )
}

const map = {
  'Galaxy LOS': GalaxyLOS,
  'Clean-Energy Loan Journeys': CleanEnergy,
  Autovert, Kalikaal, 'Namaste Vibe': NamasteVibe }

export default function ProjectVisual({ project }) {
  const C = map[project.name]
  return C ? <C /> : null
}
