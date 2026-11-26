import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check, CircleDot, GitBranch, GitPullRequest, MessageSquare, Rocket } from 'lucide-react'
import { processSteps } from '../data/content.js'
import SectionHeading from './ui/SectionHeading.jsx'
import { useReveal } from '../hooks/useReveal.js'

/* Pin + scroll through the steps only on large screens with motion allowed. */
const PIN_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const matches = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches

function useMedia(query) {
  const [m, setM] = useState(() => matches(query))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

/* Turns true once the element is mostly on screen (stacked/mobile layout). */
function useInView(ref) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, seen])
  return seen
}

/* ── Animation helpers (CSS transitions keyed off `on`) ─────────────── */
function Pop({ on, d = 0, className = '', style, children }) {
  return (
    <div
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        on ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      } ${className}`}
      style={{ transitionDelay: on ? `${d}s` : '0s', ...style }}
    >
      {children}
    </div>
  )
}

/* Line-by-line reveal for code/terminal blocks */
function Lines({ on, lines, start = 0.2, gap = 0.14, className = '' }) {
  return (
    <pre className={`whitespace-pre font-mono text-[10px] leading-[1.75] xl:text-[11px] ${className}`}>
      {lines.map((line, i) => (
        <div
          key={i}
          className="transition-opacity duration-300"
          style={{ opacity: on ? 1 : 0, transitionDelay: on ? `${start + i * gap}s` : '0s' }}
        >
          {line}
        </div>
      ))}
    </pre>
  )
}

/* Tiny highlighter for SQL / HTTP snippets */
const KW = /\b(CREATE|TABLE|INDEX|ON|PRIMARY|KEY|REFERENCES|NOT|NULL|POST|GET)\b/
function hl(line) {
  return line.split(/(\b[A-Z_]{2,}\b|'[^']*'|\b\d+\b|[(),;])/).map((t, i) => {
    if (!t) return null
    let c = 'text-sand-300'
    if (KW.test(t)) c = 'text-ember-300'
    else if (/^\d+$/.test(t)) c = 'text-ember-500'
    else if (/^[(),;]$/.test(t)) c = 'text-sand-500'
    else if (/^(uuid|text|timestamptz)$/.test(t.trim())) c = 'text-[#d7c08a]'
    return (
      <span key={i} className={c}>
        {t}
      </span>
    )
  })
}

function Window({ title, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/[0.08] bg-black/30 ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="ml-2 truncate font-mono text-[10px] text-sand-400">{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

/* ── 1 · Scope: the ticket, acceptance criteria, sub-tasks ──────────── */
const CRITERIA = [
  'Reset link is emailed to registered users',
  'Link expires after 30 minutes, single use',
  'Other sessions are signed out after reset',
  'Rate limited to 5 requests per hour',
]
const TASKS = [
  ['DB', 'reset table'],
  ['API', '2 endpoints'],
  ['UI', '2 screens'],
  ['Tests', 'edge cases'],
]

function ScopeVisual({ on }) {
  return (
    <div className="flex h-full flex-col">
      <Pop on={on} className="rounded-xl border border-white/[0.08] bg-ink-900/70 p-4">
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="rounded bg-ember-400/15 px-1.5 py-0.5 text-ember-300">FEAT-142</span>
          <span className="text-sand-500">story · 3 pts</span>
          <span className="ml-auto flex items-center gap-1 text-sand-400">
            <CircleDot className="h-3 w-3 text-ember-400" /> in progress
          </span>
        </div>
        <h4 className="mt-2.5 text-[15px] font-medium text-sand-50">Users can reset a forgotten password</h4>

        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-sand-500">Acceptance criteria</p>
        <ul className="mt-1.5 space-y-1.5">
          {CRITERIA.map((c, i) => (
            <Pop key={c} on={on} d={0.4 + i * 0.2}>
              <li className="flex items-start gap-2 text-[12px] leading-snug text-sand-300">
                <span className="mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded border border-ember-400/40 text-ember-300">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {c}
              </li>
            </Pop>
          ))}
        </ul>
      </Pop>

      <div className="mt-auto pt-4">
        <Pop on={on} d={1.3} className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-sand-500">
          split into
        </Pop>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TASKS.map(([k, v], i) => (
            <Pop key={k} on={on} d={1.4 + i * 0.14}>
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-2">
                <span className="block font-mono text-[10px] text-ember-300">{k}</span>
                <span className="block text-[11px] text-sand-400">{v}</span>
              </div>
            </Pop>
          ))}
        </div>
        <Pop on={on} d={2} className="mt-3 hidden sm:block">
          <p className="rounded-lg border border-dashed border-white/10 px-3 py-2 text-[11.5px] text-sand-400">
            <span className="text-sand-100">Q:</span> unknown email? <span className="text-sand-100">→</span> same response, so
            nobody can check which emails have accounts.
          </p>
        </Pop>
      </div>
    </div>
  )
}

/* ── 2 · Design: migration + API contract ────────────────────────────── */
const MIGRATION = [
  'CREATE TABLE password_resets (',
  '  id          uuid PRIMARY KEY,',
  '  user_id     uuid REFERENCES users,',
  '  token_hash  text NOT NULL,',
  '  expires_at  timestamptz NOT NULL,',
  '  used_at     timestamptz',
  ');',
]
const CONTRACT = [
  ['POST', '/auth/forgot', '{ email }', '202', '429'],
  ['POST', '/auth/reset', '{ token, password }', '204', '400 · 410'],
]

function DesignVisual({ on }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <Pop on={on}>
        <Window title="migrations/20261126_password_resets.sql">
          <Lines on={on} lines={MIGRATION.map(hl)} start={0.3} gap={0.12} />
        </Window>
      </Pop>
      <Pop on={on} d={0.9} className="mt-auto">
        <div className="overflow-hidden rounded-xl border border-white/[0.08]">
          <div className="grid grid-cols-[3rem_1fr_auto] gap-3 border-b border-white/[0.06] bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-sand-500 sm:grid-cols-[3rem_1fr_1fr_auto]">
            <span>method</span>
            <span>endpoint</span>
            <span className="hidden sm:block">body</span>
            <span>responses</span>
          </div>
          {CONTRACT.map(([m, path, body, ok, err], i) => (
            <Pop key={path} on={on} d={1.2 + i * 0.25}>
              <div className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-white/[0.04] px-3 py-2 font-mono text-[10.5px] last:border-0 sm:grid-cols-[3rem_1fr_1fr_auto]">
                <span className="text-ember-300">{m}</span>
                <span className="text-sand-50">{path}</span>
                <span className="hidden truncate text-sand-400 sm:block">{body}</span>
                <span className="flex gap-1.5">
                  <span className="rounded bg-ember-400/15 px-1.5 text-ember-300">{ok}</span>
                  <span className="rounded bg-white/[0.05] px-1.5 text-sand-400">{err}</span>
                </span>
              </div>
            </Pop>
          ))}
        </div>
      </Pop>
    </div>
  )
}

/* ── 3 · Build: feature branch, small commits ────────────────────────── */
const COMMITS = [
  ['a41c9e2', 'feat(db): add password_resets table', '+38'],
  ['7d0b3f1', 'feat(api): POST /auth/forgot and /auth/reset', '+142'],
  ['c92e6a4', 'fix(api): store only a hash of the token', '+9 −4'],
  ['e15f7b8', 'feat(ui): forgot + reset password screens', '+210'],
  ['3b8d0c6', 'feat(ui): loading and error states', '+47'],
]

function BuildVisual({ on }) {
  const ROW = 44
  return (
    <div className="flex h-full flex-col">
      <Pop on={on} className="flex items-center gap-2 font-mono text-[11px] text-sand-300">
        <GitBranch className="h-3.5 w-3.5 text-ember-300" />
        <span className="text-sand-500">main</span>
        <span className="text-sand-500">→</span>
        <span className="rounded bg-ember-400/15 px-1.5 py-0.5 text-ember-300">feat/password-reset</span>
      </Pop>

      <div className="relative mt-5 flex-1">
        {/* graph: main line + branch line */}
        <svg className="absolute left-0 top-0 h-full w-10 overflow-visible" aria-hidden>
          <line x1="8" y1="0" x2="8" y2={ROW * (COMMITS.length + 1)} stroke="rgba(246,240,230,0.12)" strokeWidth="1.5" />
          <path
            d={`M28 ${ROW / 2 + ROW * (COMMITS.length - 1)} C28 ${ROW * COMMITS.length + 6}, 8 ${ROW * COMMITS.length}, 8 ${ROW * COMMITS.length + ROW / 2}`}
            fill="none"
            stroke="#efab62"
            strokeWidth="1.5"
            style={{ opacity: on ? 1 : 0, transition: `opacity .4s ${on ? 0.35 + COMMITS.length * 0.3 : 0}s` }}
          />
          <path
            d={`M8 0 C8 14, 28 10, 28 ${ROW / 2}`}
            fill="none"
            stroke="#efab62"
            strokeWidth="1.5"
            style={{ opacity: on ? 1 : 0, transition: `opacity .4s ${on ? 0.2 : 0}s` }}
          />
          <line
            x1="28"
            y1={ROW / 2}
            x2="28"
            y2={ROW / 2 + ROW * (COMMITS.length - 1)}
            stroke="#efab62"
            strokeWidth="1.5"
            pathLength="1"
            strokeDasharray="1"
            style={{
              strokeDashoffset: on ? 0 : 1,
              transition: `stroke-dashoffset ${COMMITS.length * 0.3}s linear ${on ? 0.3 : 0}s`,
            }}
          />
        </svg>
        <ol>
          {COMMITS.map(([hash, msg, diff], i) => (
            <Pop key={hash} on={on} d={0.35 + i * 0.3}>
              <li className="relative flex items-center gap-3 pl-12" style={{ height: ROW }}>
                <span className="absolute left-[23px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-ember-300 bg-ink-900" />
                <span className="hidden font-mono text-[10px] text-sand-500 sm:inline">{hash}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-sand-100">
                  <span className="text-ember-300">{msg.split(':')[0]}:</span>
                  {msg.slice(msg.indexOf(':') + 1)}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-sand-500">{diff}</span>
              </li>
            </Pop>
          ))}
          <Pop on={on} d={0.35 + COMMITS.length * 0.3}>
            <li className="relative flex items-center gap-2 pl-12 font-mono text-[11px] text-sand-400" style={{ height: ROW }}>
              <span className="absolute left-[3px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-sand-300 bg-ink-900" />
              <GitPullRequest className="h-3.5 w-3.5 text-ember-300" /> opened PR #87 → main
            </li>
          </Pop>
        </ol>
      </div>
    </div>
  )
}

/* ── 4 · Verify: tests, CI checks, review ────────────────────────────── */
const TEST_OUT = [
  <span key="c" className="text-sand-500">$ npm test auth/reset</span>,
  <span key="p">
    <span className="rounded bg-ember-400/80 px-1 text-ink-900">PASS</span> <span className="text-sand-300">api/auth.reset.test.js</span>
  </span>,
  ...[
    ['emails a link to known users', '41ms'],
    ['same response for unknown emails', '17ms'],
    ['rejects expired or used tokens', '12ms'],
    ['rate limits after 5 attempts', '29ms'],
  ].map(([t, ms]) => (
    <span key={t} className="text-sand-300">
      {'  '}
      <span className="text-ember-300">✓</span> {t} <span className="text-sand-500">({ms})</span>
    </span>
  )),
  <span key="s" className="text-sand-100">
    Tests: <span className="text-ember-300">4 passed</span>, 4 total
  </span>,
]

function VerifyVisual({ on }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <Pop on={on}>
        <Window title="terminal">
          <Lines on={on} lines={TEST_OUT} start={0.3} gap={0.18} />
        </Window>
      </Pop>
      <Pop on={on} d={1.4} className="mt-auto">
        <div className="rounded-xl border border-white/[0.08] bg-ink-900/70 p-3.5">
          <div className="flex items-center gap-2">
            <GitPullRequest className="h-4 w-4 text-ember-300" />
            <span className="truncate text-[13px] text-sand-50">#87 Add password reset flow</span>
            <span className="ml-auto shrink-0 rounded-full border border-ember-400/30 bg-ember-400/10 px-2 py-0.5 font-mono text-[9px] text-ember-300">
              approved
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {['lint', 'tests', 'build'].map((c, i) => (
              <Pop key={c} on={on} d={1.7 + i * 0.15}>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-sand-300">
                  <Check className="h-3 w-3 text-ember-300" strokeWidth={2.5} /> {c}
                </span>
              </Pop>
            ))}
          </div>
          <Pop on={on} d={2.2} className="mt-2.5 hidden sm:block">
            <p className="flex items-start gap-2 text-[11.5px] text-sand-400">
              <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand-500" />
              <span>
                <span className="text-sand-100">Review:</span> log failed reset attempts?{' '}
                <span className="text-ember-300">→ added in 9f2a1c4</span>
              </span>
            </p>
          </Pop>
        </div>
      </Pop>
    </div>
  )
}

/* ── 5 · Ship: pipeline + post-release monitoring ────────────────────── */
const STAGES = [
  ['Build', '41s'],
  ['Test', '1m 08s'],
  ['Deploy', '36s'],
  ['Live', ''],
]
const LOGS = [
  ['202', 'POST /auth/forgot', '38ms'],
  ['204', 'POST /auth/reset', '52ms'],
  ['202', 'POST /auth/forgot', '35ms'],
]
const SPARK = 'M0 26 L12 22 L24 24 L36 18 L48 20 L60 14 L72 16 L84 12 L96 13 L108 9 L120 11'

function ShipVisual({ on }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <Pop on={on} className="flex items-center gap-2 font-mono text-[11px] text-sand-400">
        <Rocket className="h-3.5 w-3.5 text-ember-300" /> merge #87 → main
      </Pop>

      <div className="flex items-center">
        {STAGES.map(([name, time], i) => (
          <div key={name} className={`flex items-center ${i < STAGES.length - 1 ? 'flex-1' : ''}`}>
            <Pop on={on} d={0.3 + i * 0.4}>
              <div
                className={`rounded-lg border px-2.5 py-2 text-center sm:px-3 ${
                  i === STAGES.length - 1 ? 'border-ember-400/50 bg-ember-400/15' : 'border-white/[0.08] bg-white/[0.02]'
                }`}
              >
                <span className="flex items-center justify-center gap-1 text-[11.5px] text-sand-50">
                  <Check className="h-3 w-3 text-ember-300" strokeWidth={2.5} />
                  {name}
                </span>
                {time && <span className="block font-mono text-[9px] text-sand-500">{time}</span>}
              </div>
            </Pop>
            {i < STAGES.length - 1 && (
              <span className="relative mx-1.5 h-px flex-1 bg-white/10">
                <span
                  className="absolute inset-0 origin-left bg-ember-400/70 transition-transform duration-300"
                  style={{ transform: `scaleX(${on ? 1 : 0})`, transitionDelay: on ? `${0.55 + i * 0.4}s` : '0s' }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      <Pop on={on} d={1.9} className="mt-auto">
        <div className="rounded-xl border border-white/[0.08] bg-black/30 p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-sand-500">after release · 24h</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-sand-400">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ember-400" /> watching
            </span>
          </div>
          <div className="mt-3 grid grid-cols-[auto_1fr] items-end gap-5">
            <div className="space-y-1">
              <p className="font-mono text-[10px] text-sand-500">
                5xx errors <span className="ml-1 text-sand-50">0</span>
              </p>
              <p className="font-mono text-[10px] text-sand-500">
                p95 latency <span className="ml-1 text-sand-50">54ms</span>
              </p>
            </div>
            <svg viewBox="0 0 120 30" className="h-9 w-full" preserveAspectRatio="none" aria-hidden>
              <path
                d={SPARK}
                fill="none"
                stroke="#efab62"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: on ? 1 : 0, transition: `opacity .6s ${on ? 2.2 : 0}s` }}
              />
            </svg>
          </div>
          <div className="mt-3 hidden space-y-1 border-t border-white/[0.06] pt-2.5 sm:block">
            {LOGS.map(([code, path, ms], i) => (
              <Pop key={i} on={on} d={2.4 + i * 0.25}>
                <p className="font-mono text-[10px] text-sand-400">
                  <span className="text-sand-500">info</span> <span className="text-ember-300">{code}</span> {path}{' '}
                  <span className="text-sand-500">{ms}</span>
                </p>
              </Pop>
            ))}
          </div>
        </div>
      </Pop>
    </div>
  )
}

const VISUALS = [ScopeVisual, DesignVisual, BuildVisual, VerifyVisual, ShipVisual]

/* ── Card frame shared by both layouts ──────────────────────────────── */
function Frame({ index, label, className = '', children }) {
  return (
    <div className={`glass relative flex flex-col overflow-hidden rounded-[28px] shadow-card ${className}`}>
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/10" />
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sand-500">
          <span className="text-ember-400">0{index + 1}</span> / 0{processSteps.length} · {label}
        </span>
      </div>
      <div className="relative flex-1 p-5 sm:p-6">{children}</div>
    </div>
  )
}

/* ── Stacked layout: phones, tablets, reduced motion ────────────────── */
function StackedStep({ step, index, reduced }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  const Visual = VISUALS[index]
  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-10">
      <div data-reveal>
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-4xl italic text-ember-300">0{index + 1}</span>
          <span className="label">{step.label}</span>
        </div>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-sand-50">{step.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-sand-400">{step.text}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {step.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
      <Frame index={index} label={step.label} className="min-h-[380px] sm:h-[440px]">
        <Visual on={reduced || seen} />
      </Frame>
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────────────── */
export default function About() {
  const root = useRef(null)
  const pinRef = useRef(null)
  const barRef = useRef(null)
  const stRef = useRef(null)
  const pinMode = useMedia(PIN_QUERY)
  const reduced = useMedia(REDUCED_QUERY)
  const [active, setActive] = useState(0)
  const n = processSteps.length

  useReveal(root)

  useGSAP(
    () => {
      if (!pinMode) return
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'center center',
        end: `+=${(n - 1) * 80}%`,
        pin: true,
        snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.5 }, delay: 0.08, ease: 'power1.inOut' },
        onUpdate: (self) => {
          gsap.set(barRef.current, { scaleY: self.progress })
          setActive(Math.round(self.progress * (n - 1)))
        },
      })
      stRef.current = st
      return () => {
        st.kill()
        stRef.current = null
      }
    },
    { dependencies: [pinMode], scope: root, revertOnUpdate: true },
  )

  const goTo = (i) => {
    const st = stRef.current
    if (!st) return
    window.scrollTo({ top: st.start + ((st.end - st.start) * i) / (n - 1), behavior: 'smooth' })
  }

  return (
    <section id="about" ref={root} className="container-x py-24 md:py-32">
      <SectionHeading index="01" eyebrow="How I work" title="From ticket to" accent="production.">
        How I take a feature from a ticket to production.
      </SectionHeading>

      {pinMode ? (
        <div ref={pinRef} className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-12">
          {/* Step list */}
          <div data-reveal className="relative">
            <span className="absolute bottom-3 left-[5px] top-3 w-px bg-white/10" aria-hidden />
            <span
              ref={barRef}
              className="absolute bottom-3 left-[5px] top-3 w-px origin-top scale-y-0 bg-gradient-to-b from-ember-300 to-ember-600"
              aria-hidden
            />
            <ol>
              {processSteps.map((s, i) => {
                const on = i === active
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => goTo(i)}
                      aria-current={on ? 'step' : undefined}
                      className="group relative w-full py-2.5 pl-9 text-left"
                    >
                      <span
                        className={`absolute left-0 top-[19px] h-[11px] w-[11px] rounded-full border transition-all duration-500 ${
                          i <= active ? 'border-ember-400 bg-ember-400' : 'border-white/20 bg-ink-900'
                        } ${on ? 'shadow-[0_0_0_5px_rgba(239,171,98,0.15)]' : ''}`}
                      />
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`font-serif text-xl italic transition-colors duration-500 ${
                            on ? 'text-ember-300' : 'text-sand-500 group-hover:text-sand-300'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span className={`label transition-colors duration-500 ${on ? 'text-sand-300' : 'text-sand-500'}`}>{s.label}</span>
                      </div>
                      <h3
                        className={`mt-1 text-lg font-medium tracking-tight transition-colors duration-500 xl:text-xl ${
                          on ? 'text-sand-50' : 'text-sand-500 group-hover:text-sand-300'
                        }`}
                      >
                        {s.title}
                      </h3>
                      <div
                        className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                        style={{ gridTemplateRows: on ? '1fr' : '0fr', opacity: on ? 1 : 0 }}
                      >
                        <div className="overflow-hidden">
                          <p className="pt-2 text-[14.5px] leading-relaxed text-sand-400">{s.text}</p>
                          <div className="flex flex-wrap gap-2 pt-3">
                            {s.tags.map((t) => (
                              <span key={t} className="chip">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ol>
            <p className="mt-5 pl-9 font-mono text-[10px] uppercase tracking-[0.16em] text-sand-500">
              Scroll to walk through · or pick a step
            </p>
          </div>

          {/* Visual stage */}
          <div data-reveal>
            <Frame index={active} label={processSteps[active].label} className="h-[490px]">
              <span
                className="pointer-events-none absolute -bottom-10 -right-2 font-serif text-[200px] italic leading-none text-white/[0.025]"
                aria-hidden
              >
                0{active + 1}
              </span>
              {VISUALS.map((Visual, i) => (
                <div
                  key={i}
                  className="absolute inset-5 transition-opacity duration-500 sm:inset-6"
                  style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? 'auto' : 'none' }}
                  aria-hidden={i !== active}
                >
                  <Visual on={i === active} />
                </div>
              ))}
            </Frame>
          </div>
        </div>
      ) : (
        <div className="space-y-16 md:space-y-20">
          {processSteps.map((s, i) => (
            <StackedStep key={s.key} step={s} index={i} reduced={reduced} />
          ))}
        </div>
      )}
    </section>
  )
}
