import { useState } from 'react'
import { education, profile } from '../data/cv'

export function ContactDeck() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="relative px-4 pt-20 pb-28 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-amber uppercase amber-glow">
            DECK // OUT
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            About & Contact
          </h2>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="clip-frame border border-phosphor/25 bg-bay-raised/70 p-6 sm:p-8">
            <p className="text-base leading-relaxed text-signal/90">
              {profile.summary}
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] tracking-widest text-muted uppercase">
                  Location
                </dt>
                <dd className="mt-1 text-sm">{profile.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-widest text-muted uppercase">
                  Languages
                </dt>
                <dd className="mt-1 text-sm">
                  {profile.languages.map((l) => `${l.name} (${l.level})`).join(' · ')}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-mono text-[10px] tracking-widest text-muted uppercase">
                  Education
                </dt>
                <dd className="mt-1 text-sm">
                  {education.field} — {education.school}
                  <span className="text-muted"> · {education.note}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="clip-frame-sm border border-phosphor/50 bg-phosphor/10 px-5 py-4 font-mono text-sm tracking-wide text-phosphor shadow-[0_0_24px_rgb(0_240_255/0.12)] transition hover:bg-phosphor/20"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="clip-frame-sm border border-bezel-edge px-5 py-3 text-left font-mono text-xs tracking-[0.18em] text-muted uppercase transition hover:border-amber/50 hover:text-amber"
            >
              {copied ? 'Copied ✓' : 'Copy Email'}
            </button>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="clip-frame-sm border border-phosphor/20 px-5 py-4 font-mono text-sm text-signal transition hover:border-phosphor/40"
            >
              {profile.phone}
            </a>
          </div>
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-phosphor/20 pt-6 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="text-phosphor/70">Frame-by-frame // On time</span>
        </footer>
      </div>
    </section>
  )
}
