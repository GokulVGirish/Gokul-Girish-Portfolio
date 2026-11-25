import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content.js'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 text-sm text-sand-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed & built with React, Tailwind & GSAP.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5 hover:text-sand-50"
          >
            <GithubIcon />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5 hover:text-sand-50"
          >
            <LinkedinIcon />
          </a>
          <a
            href="#top"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sand-300 transition-colors hover:border-ember-400/50 hover:text-sand-50"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
