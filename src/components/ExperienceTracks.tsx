import { motion } from 'framer-motion'
import { experience } from '../data/cv'

const trackColor = {
  V1: 'var(--color-track-v)',
  V2: 'var(--color-phosphor)',
  A1: 'var(--color-track-a)',
} as const

export function ExperienceTracks() {
  return (
    <section id="experience" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-amber uppercase amber-glow">
            TIMELINE // TRACKS
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Experience
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Roles laid out as clips on video and audio tracks.
          </p>
        </header>

        <div className="space-y-8">
          {experience.map((clip, i) => (
            <motion.article
              key={clip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="grid gap-4 sm:grid-cols-[4.5rem_1fr]"
            >
              <div className="flex items-start gap-2 pt-1 font-mono text-[10px] tracking-wider text-muted">
                <span
                  className="rounded px-1.5 py-0.5 text-[9px] font-semibold text-bay"
                  style={{ background: trackColor[clip.track] }}
                >
                  {clip.track}
                </span>
              </div>

              <div>
                <div className="mb-3 h-8 overflow-hidden border border-phosphor/20 bg-bay-panel">
                  <motion.div
                    className="origin-left flex h-full items-center truncate px-3 font-mono text-[10px] tracking-wide text-signal"
                    style={{
                      width: clip.width,
                      background: `linear-gradient(90deg, ${trackColor[clip.track]}55, ${trackColor[clip.track]}22)`,
                      borderRight: `2px solid ${trackColor[clip.track]}`,
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {clip.role}
                  </motion.div>
                </div>

                <div className="border border-phosphor/15 bg-bay-raised/60 px-4 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">
                      {clip.role}
                    </h3>
                    <span className="font-mono text-[11px] text-phosphor">
                      {clip.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{clip.org}</p>
                  <ul className="mt-3 space-y-1.5">
                    {clip.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-sm text-signal/85"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-phosphor/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
