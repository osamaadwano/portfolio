import { motion } from 'framer-motion'
import { experience } from '../data/cv'
import { useCoarsePointer } from '../hooks/useCoarsePointer'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionMark } from './SectionMark'

const trackColor = {
  V1: 'var(--color-track-v)',
  V2: 'var(--color-phosphor)',
  A1: 'var(--color-track-a)',
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function ExperienceTracks() {
  const reduced = usePrefersReducedMotion()
  const coarse = useCoarsePointer()
  const calm = reduced || coarse

  return (
    <section id="experience" className="relative scroll-mt-20 border-t border-phosphor/10 px-4 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionMark
          index="02"
          kicker="Experience"
          title="Timeline"
          lede={
            <>
              <span className="sm:hidden">News, tourism, and freelance since 2022.</span>
              <span className="hidden sm:inline">
                Roles as clips on video and audio tracks.
              </span>
            </>
          }
        />

        <div className="space-y-5 sm:space-y-8">
          {experience.map((clip, i) => (
            <motion.article
              key={clip.id}
              initial={calm ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: calm ? 0 : i * 0.05, duration: calm ? 0.35 : 0.65, ease }}
              className="relative sm:grid sm:grid-cols-[4.5rem_1fr] sm:gap-4"
            >
              <div
                className={`absolute top-3 left-[7px] w-px bg-phosphor/20 sm:hidden ${
                  i === experience.length - 1 ? 'bottom-3' : '-bottom-5'
                }`}
                aria-hidden
              />

              <div className="mb-2 flex items-center gap-3 pl-0 sm:mb-0 sm:block sm:pt-1">
                <span
                  className="relative z-10 rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-semibold text-bay"
                  style={{ background: trackColor[clip.track] }}
                >
                  {clip.track}
                </span>
                <span className="font-mono text-[11px] text-phosphor sm:hidden">
                  {clip.period}
                </span>
              </div>

              <div className="pl-7 sm:pl-0">
                <div className="mb-3 hidden h-2 overflow-hidden rounded-sm border border-phosphor/15 bg-bay-panel sm:block">
                  <motion.div
                    className="h-full origin-left"
                    style={{
                      width: clip.width,
                      background: `linear-gradient(90deg, ${trackColor[clip.track]}, ${trackColor[clip.track]}55)`,
                    }}
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, ease }}
                  />
                </div>

                <div
                  className="rounded-sm border border-phosphor/12 border-l-2 bg-bay-raised/50 px-4 py-4"
                  style={{ borderLeftColor: trackColor[clip.track] }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-display text-base leading-snug font-semibold sm:text-lg">
                      {clip.role}
                    </h3>
                    <span className="hidden font-mono text-[11px] text-phosphor sm:inline">
                      {clip.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{clip.org}</p>
                  <ul className="mt-3 space-y-1.5">
                    {clip.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-sm leading-relaxed text-signal/85"
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
