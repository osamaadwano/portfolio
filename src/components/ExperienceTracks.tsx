import { motion } from 'framer-motion'
import { experience } from '../data/cv'

const trackColor = {
  V1: 'var(--color-track-v)',
  V2: 'var(--color-phosphor)',
  A1: 'var(--color-track-a)',
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function ExperienceTracks() {
  return (
    <section id="experience" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.28em] text-amber uppercase">
            Experience
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Timeline
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Roles as clips on video and audio tracks.
          </p>
        </header>

        <div className="space-y-8">
          {experience.map((clip, i) => (
            <motion.article
              key={clip.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05, duration: 0.65, ease }}
              className="grid gap-4 sm:grid-cols-[4.5rem_1fr]"
            >
              <div className="flex items-start pt-1">
                <span
                  className="rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-semibold text-bay"
                  style={{ background: trackColor[clip.track] }}
                >
                  {clip.track}
                </span>
              </div>

              <div>
                <div className="mb-3 h-7 overflow-hidden rounded-sm border border-phosphor/15 bg-bay-panel">
                  <motion.div
                    className="origin-left flex h-full items-center truncate px-3 font-mono text-[10px] tracking-wide text-signal"
                    style={{
                      width: clip.width,
                      background: `linear-gradient(90deg, ${trackColor[clip.track]}44, ${trackColor[clip.track]}18)`,
                      borderRight: `2px solid ${trackColor[clip.track]}`,
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, ease }}
                  >
                    {clip.role}
                  </motion.div>
                </div>

                <div className="rounded-sm border border-phosphor/12 bg-bay-raised/50 px-4 py-4">
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
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-phosphor/60" />
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
