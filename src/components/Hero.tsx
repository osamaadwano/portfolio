import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/cv'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useTimecode } from '../hooks/useTimecode'

const ease = [0.22, 1, 0.36, 1] as const

const crafts = ['Storytelling', 'Color', 'Sound', 'Motion', 'Rhythm']

function RotatingCraft({ reduced }: { reduced: boolean }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % crafts.length),
      2400,
    )
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <span className="relative inline-flex h-[1.2em] min-w-[7.5ch] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={crafts[index]}
          initial={reduced ? false : { y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-amber"
        >
          {crafts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function PreviewDeck({
  reduced,
  timecode,
  playing,
  onToggle,
}: {
  reduced: boolean
  timecode: string
  playing: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 140, damping: 20, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), spring)

  const glowX = useTransform(px, (v) => `${(v + 0.5) * 100}%`)
  const glowY = useTransform(py, (v) => `${(v + 0.5) * 100}%`)
  const glow = useMotionTemplate`radial-gradient(340px circle at ${glowX} ${glowY}, rgb(0 232 240 / 0.16), transparent 70%)`

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-lg border border-phosphor/20 bg-bay-raised/80 p-2.5 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] backdrop-blur-sm"
      >
        {/* Deck header */}
        <div className="mb-2 flex items-center gap-2 px-1">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-track-a" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-muted uppercase">
              Program
            </span>
          </span>
          <span className="ml-auto font-mono text-[9px] tracking-[0.18em] text-muted uppercase">
            4K · 25 fps
          </span>
        </div>

        {/* Screen */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#04070c] sm:aspect-video">
          <div className="absolute inset-0 bg-[linear-gradient(140deg,#050a12_0%,#0a1620_45%,#0d1a16_100%)]" />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={reduced ? undefined : { background: glow }}
          />

          {/* Waveform */}
          <div className="absolute inset-x-10 top-1/2 flex h-24 -translate-y-1/3 items-center justify-center gap-[3px]">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-full flex-1 rounded-[1px] bg-gradient-to-t from-phosphor/10 via-phosphor/40 to-phosphor/70"
                animate={
                  reduced || !playing
                    ? { height: 10 + ((i * 7) % 22) }
                    : {
                        height: [
                          8 + ((i * 5) % 18),
                          22 + ((i * 11) % 38),
                          12 + ((i * 3) % 20),
                        ],
                      }
                }
                transition={{
                  duration: 2.4 + (i % 6) * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>

          {/* Playhead */}
          {!reduced && playing && (
            <motion.div
              className="absolute inset-y-0 w-px bg-amber/80 shadow-[0_0_12px_var(--color-amber)]"
              animate={{ left: ['6%', '94%'] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Framing reticle */}
          <div className="pointer-events-none absolute inset-6 rounded-sm border border-signal/8">
            <span className="absolute -top-px -left-px size-3 border-t border-l border-phosphor/50" />
            <span className="absolute -top-px -right-px size-3 border-t border-r border-phosphor/50" />
            <span className="absolute -bottom-px -left-px size-3 border-b border-l border-phosphor/50" />
            <span className="absolute -right-px -bottom-px size-3 border-r border-b border-phosphor/50" />
          </div>

          <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.18em] text-muted uppercase">
            SEQ 01
          </div>
          <div className="absolute top-3 right-3 font-mono text-[10px] text-phosphor tabular-nums phosphor-glow">
            {timecode}
          </div>
        </div>

        {/* Transport */}
        <div className="mt-2.5 flex items-center gap-3 px-1">
          <button
            type="button"
            onClick={onToggle}
            aria-label={playing ? 'Pause preview' : 'Play preview'}
            className="flex size-8 items-center justify-center rounded-sm border border-phosphor/30 bg-bay-panel text-phosphor transition duration-300 hover:border-phosphor/60 hover:bg-phosphor/10"
          >
            {playing ? (
              <span className="flex gap-0.5">
                <span className="h-3 w-0.5 bg-current" />
                <span className="h-3 w-0.5 bg-current" />
              </span>
            ) : (
              <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
            )}
          </button>

          <div className="h-px flex-1 bg-gradient-to-r from-phosphor/40 via-phosphor/10 to-transparent" />

          <span className="font-mono text-[9px] tracking-[0.18em] text-muted uppercase">
            Premiere · After Effects
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const [playing, setPlaying] = useState(!reduced)
  const timecode = useTimecode(playing && !reduced)

  const [first, last] = profile.name.split(' ')

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-12 pb-10 sm:px-8">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        {/* Type stack */}
        <div>
          <h1 className="font-display text-[clamp(2.8rem,8.5vw,5.6rem)] leading-[0.92] font-extrabold tracking-[-0.03em] text-signal">
            {[first, last].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="mt-5 font-mono text-sm tracking-[0.06em] text-signal/80 sm:text-base"
          >
            Video Editor — built on <RotatingCraft reduced={reduced} />
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36, ease }}
            className="mt-4 max-w-md text-sm leading-relaxed text-muted"
          >
            Full post-production for ads, VSL, news, travel, and social —
            cutting, color, sound, and motion delivered frame by frame.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#work"
              className="group relative overflow-hidden rounded-sm border border-phosphor/50 bg-phosphor/10 px-6 py-3 font-mono text-xs tracking-[0.18em] text-phosphor uppercase transition duration-300 hover:border-phosphor hover:bg-phosphor/20"
            >
              <span className="relative z-10">View Work</span>
              <span className="absolute inset-0 -translate-x-full bg-phosphor/15 transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              className="rounded-sm border border-bezel-edge px-6 py-3 font-mono text-xs tracking-[0.18em] text-signal uppercase transition duration-300 hover:border-amber/60 hover:text-amber"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Preview deck */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <PreviewDeck
            reduced={reduced}
            timecode={timecode}
            playing={playing}
            onToggle={() => setPlaying((p) => !p)}
          />
        </motion.div>
      </div>

      {/* Filmstrip + scroll cue */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7, ease }}
        className="relative z-10 mx-auto mt-14 w-full max-w-6xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-1 gap-1 overflow-hidden">
            {Array.from({ length: 26 }).map((_, i) => (
              <span
                key={i}
                className="h-7 flex-1 rounded-[2px] border border-phosphor/10"
                style={{
                  background:
                    i % 4 === 0
                      ? 'rgb(0 232 240 / 0.12)'
                      : i % 7 === 0
                        ? 'rgb(184 255 60 / 0.1)'
                        : 'rgb(255 255 255 / 0.02)',
                }}
              />
            ))}
          </div>
          <a
            href="#work"
            className="flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase transition duration-300 hover:text-phosphor"
          >
            Scroll
            <motion.span
              className="block h-px w-8 bg-current"
              animate={reduced ? undefined : { scaleX: [0.4, 1, 0.4] }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
