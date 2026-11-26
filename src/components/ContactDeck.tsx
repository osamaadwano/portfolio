import { useState } from 'react'
import { profile } from '../data/cv'
import { SectionMark } from './SectionMark'

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
    <section id="contact" className="relative scroll-mt-20 border-t border-phosphor/10 px-4 pt-12 pb-8 sm:px-8 sm:pt-20 sm:pb-28">
      <div className="mx-auto max-w-5xl">
        <SectionMark index="04" kicker="Contact" title="About & Contact" />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-sm border border-phosphor/15 bg-bay-raised/60 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-signal/90 sm:text-base">
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
                <dd className="mt-1 space-y-1 text-sm">
                  {profile.languages.map((l) => (
                    <span key={l.name} className="block">
                      {l.name}
                      <span className="text-muted"> · {l.level}</span>
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex min-h-12 items-center rounded-sm border border-phosphor/40 bg-phosphor/10 px-5 py-3.5 font-mono text-[13px] break-all text-phosphor transition duration-300 hover:bg-phosphor/18 sm:text-sm"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="min-h-12 rounded-sm border border-bezel-edge px-5 py-3 text-left font-mono text-xs tracking-[0.16em] text-muted uppercase transition duration-300 hover:border-amber/45 hover:text-amber"
            >
              {copied ? 'Copied' : 'Copy Email'}
            </button>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="flex min-h-12 items-center rounded-sm border border-phosphor/15 px-5 py-3.5 font-mono text-sm text-signal transition duration-300 hover:border-phosphor/35"
            >
              {profile.phone}
            </a>
          </div>
        </div>

        <footer className="mt-10 flex flex-col items-center gap-2 border-t border-phosphor/12 pt-5 text-center font-mono text-[10px] tracking-[0.12em] text-muted uppercase sm:mt-16 sm:flex-row sm:justify-center sm:gap-8 sm:pt-6 sm:tracking-[0.14em]">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="text-phosphor/60">Frame-by-frame · On time</span>
        </footer>
      </div>
    </section>
  )
}
