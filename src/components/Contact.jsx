import { useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Eye, FileText, Mail, Phone } from 'lucide-react'
import { profile } from '../data/content.js'
import Magnetic from './ui/Magnetic.jsx'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons.jsx'
import { useReveal, spotlight } from '../hooks/useReveal.js'

export default function Contact() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  useReveal(root)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea')
      ta.value = profile.email
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const links = [
    { label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedinIcon, note: 'Connect professionally' },
    { label: 'GitHub', href: profile.socials.github, Icon: GithubIcon, note: 'Browse the code' },
  ]

  return (
    <section id="contact" ref={root} className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-ember-500/[0.08] blur-[120px]" />
      <div className="container-x">
        <p data-reveal className="label mb-6 flex items-center gap-3">
          <span className="text-ember-400">05</span>
          <span className="h-px w-8 bg-white/15" />
          Contact
        </p>
        <h2
          data-reveal
          className="max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.03em] text-sand-50 sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Let’s build something that <span className="font-serif font-normal italic text-ember-300">moves.</span>
        </h2>
        <p data-reveal className="mt-6 max-w-xl text-sand-400">
          Hiring for a frontend or full-stack role, or have a product that needs to feel fast and polished? My inbox is
          open.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          {/* Email card */}
          <div data-reveal onPointerMove={spotlight} className="spotlight glass rounded-[28px] p-6 shadow-card sm:p-8">
            <p className="label mb-4">Email me</p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${profile.email}`}
                className="break-all text-2xl font-medium tracking-tight text-sand-50 transition-colors hover:text-ember-300 sm:text-3xl"
              >
                {profile.email}
              </a>
              <div className="flex shrink-0 gap-2">
                <Magnetic strength={0.25}>
                  <button
                    type="button"
                    onClick={copy}
                    className={`btn ${copied ? 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/40' : 'btn-primary'}`}
                    aria-live="polite"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </Magnetic>
                <a href={`mailto:${profile.email}`} className="btn-ghost" aria-label="Open email app">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-6 text-sm text-sand-400">
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-sand-50">
                <Phone className="h-4 w-4" /> {profile.phone}
              </a>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Links */}
          <ul className="grid gap-3">
            {links.map(({ label, href, Icon, note }) => (
              <li key={label} data-reveal>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onPointerMove={spotlight}
                  className="spotlight glass group flex items-center justify-between rounded-2xl px-5 py-4 transition-colors duration-500 hover:border-ember-400/30"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-sand-100 transition-colors group-hover:text-ember-300">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block font-medium text-sand-50">{label}</span>
                      <span className="block text-xs text-sand-500">{note}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-sand-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-300" />
                </a>
              </li>
            ))}
            {/* Résumé: view and download as separate actions */}
            <li data-reveal>
              <div
                onPointerMove={spotlight}
                className="spotlight glass flex items-center justify-between gap-3 rounded-2xl px-5 py-4 transition-colors duration-500 hover:border-ember-400/30"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-sand-100">
                    <FileText className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block font-medium text-sand-50">Résumé</span>
                    <span className="block text-xs text-sand-500">PDF, 2 pages</span>
                  </span>
                </span>
                <span className="flex shrink-0 gap-2">
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-sand-50 transition-colors hover:border-ember-400/50 hover:bg-ember-400/10"
                  >
                    <Eye className="h-4 w-4" /> View
                  </a>
                  <a
                    href={profile.resume}
                    download
                    className="inline-flex items-center gap-1.5 rounded-full bg-sand-50 px-3.5 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-ember-300"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
