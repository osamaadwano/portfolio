import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import { profile } from '../data/cv'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useTimecode } from '../hooks/useTimecode'
import { MonitorBezel } from './MonitorBezel'
import { TransportBar } from './TransportBar'

export function ProgramMonitor() {
  const reduced = usePrefersReducedMotion()
  const [playing, setPlaying] = useState(!reduced)
  const [progress, setProgress] = useState(0.12)
  const timecode = useTimecode(playing && !reduced)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!playing && !reduced) return
    if (playing) setProgress(0.12 + v * 0.55)
  })

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center px-4 pt-8 pb-16 sm:px-8"
    >
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(0_240_255/0.12),transparent_45%),radial-gradient(ellipse_at_80%_70%,rgb(255_45_149/0.1),transparent_40%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <MonitorBezel label="PROGRAM // OUT">
          <div className="relative aspect-[16/10] sm:aspect-video">
            <div className="absolute inset-0 bg-[#050810]" />
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  'linear-gradient(135deg, #050810 0%, #0a1528 35%, #1a0a20 60%, #051018 100%)',
              }}
            />
            {/* Accent beams */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/4 left-1/3 h-[140%] w-px rotate-12 bg-gradient-to-b from-transparent via-phosphor/40 to-transparent" />
              <div className="absolute -top-1/4 right-1/3 h-[140%] w-px -rotate-12 bg-gradient-to-b from-transparent via-amber/30 to-transparent" />
            </div>

            {!reduced && playing && (
              <motion.div
                className="absolute inset-y-[12%] w-px bg-phosphor shadow-[0_0_16px_var(--color-phosphor)]"
                animate={{ left: ['6%', '92%'] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
              />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="font-mono text-[10px] tracking-[0.4em] text-amber uppercase amber-glow sm:text-xs">
                Remote // Post-Production
              </p>
              <h1
                className="font-display glitch-text mt-3 text-[clamp(2.2rem,7.5vw,5rem)] leading-[0.95] font-black tracking-[0.02em] text-signal"
                data-text={profile.name.toUpperCase()}
              >
                {profile.name.toUpperCase()}
              </h1>
              <p className="mt-4 max-w-md font-mono text-sm text-muted sm:text-base">
                {profile.title}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#work"
                  className="clip-frame-sm border border-phosphor/60 bg-phosphor/15 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-phosphor uppercase shadow-[0_0_24px_rgb(0_240_255/0.2)] transition hover:bg-phosphor/25"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="clip-frame-sm border border-amber/50 bg-amber/10 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-amber uppercase transition hover:bg-amber/20"
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-phosphor/70">
              4K · 25fps · HDR
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-2 font-mono text-[10px] text-danger">
              <span className="size-1.5 animate-pulse bg-danger shadow-[0_0_8px_var(--color-danger)]" />
              SIGNAL
            </div>
          </div>
        </MonitorBezel>

        <div className="mt-4">
          <TransportBar
            playing={playing}
            onToggle={() => setPlaying((p) => !p)}
            timecode={timecode}
            progress={progress}
            onSeek={(r) => {
              setProgress(r)
              setPlaying(false)
            }}
          />
        </div>
      </div>
    </section>
  )
}
