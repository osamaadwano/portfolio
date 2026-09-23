import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../data/cv'
import { formatTimecode } from '../hooks/useTimecode'

type Phase = 'boot' | 'link' | 'id'

type Props = {
  onComplete: () => void
}

export function OpeningIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('boot')
  const [frames, setFrames] = useState(0)
  const [bootLines, setBootLines] = useState(0)

  const lines = [
    '> INIT EDIT_CORE…',
    '> LOAD NEURAL_PIPE…',
    '> SYNC COLOR_LUT…',
    '> AUDIO BUS OK',
    '> LINK ESTABLISHED',
  ]

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('link'), 1600)
    const t2 = window.setTimeout(() => setPhase('id'), 3000)
    const t3 = window.setTimeout(() => onComplete(), 5400)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [onComplete])

  useEffect(() => {
    if (phase !== 'boot') return
    const id = window.setInterval(() => {
      setBootLines((n) => Math.min(n + 1, lines.length))
    }, 280)
    return () => window.clearInterval(id)
  }, [phase, lines.length])

  useEffect(() => {
    if (phase === 'boot') return
    const id = window.setInterval(() => setFrames((f) => f + 1), 40)
    return () => window.clearInterval(id)
  }, [phase])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onComplete()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-label="Opening sequence"
    >
      <div className="cyber-grid absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_240_255/0.08),transparent_55%)]" />

      <button
        type="button"
        onClick={onComplete}
        className="absolute top-5 right-5 z-20 font-mono text-[11px] tracking-[0.2em] text-muted uppercase transition hover:text-amber"
      >
        ESC // SKIP
      </button>

      <div className="relative aspect-video w-[min(92vw,880px)] overflow-hidden neon-border clip-frame bg-bay-raised">
        <AnimatePresence mode="wait">
          {phase === 'boot' && (
            <motion.div
              key="boot"
              className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <p className="mb-4 font-mono text-[10px] tracking-[0.35em] text-amber uppercase amber-glow">
                SYSTEM BOOT
              </p>
              <ul className="space-y-2 font-mono text-xs text-phosphor sm:text-sm">
                {lines.slice(0, bootLines).map((line) => (
                  <li key={line} className="phosphor-glow">
                    {line}
                  </li>
                ))}
                {bootLines < lines.length && (
                  <li className="animate-pulse text-muted">_</li>
                )}
              </ul>
            </motion.div>
          )}

          {phase === 'link' && (
            <motion.div
              key="link"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="cyber-grid-fine absolute inset-0" />
              <motion.div
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-phosphor to-transparent shadow-[0_0_20px_var(--color-phosphor)]"
                animate={{ top: ['15%', '85%', '15%'] }}
                transition={{ duration: 1.2, ease: 'linear' }}
              />
              <p className="font-mono text-xs tracking-[0.4em] text-phosphor uppercase phosphor-glow">
                ESTABLISHING UPLINK
              </p>
              <p className="mt-3 font-mono text-[10px] text-muted tabular-nums">
                {formatTimecode(frames)}
              </p>
            </motion.div>
          )}

          {phase === 'id' && (
            <motion.div
              key="id"
              className="absolute inset-0 flex items-center justify-center bg-bay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="cyber-grid absolute inset-0 opacity-50" />
              <div className="relative w-[min(86%,440px)] border border-phosphor/40 bg-bay-panel/90 px-8 py-8 text-center shadow-[0_0_60px_rgb(0_240_255/0.15)]">
                <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-amber" />
                <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-amber" />
                <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-amber" />
                <span className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-amber" />

                <p className="font-mono text-[10px] tracking-[0.35em] text-amber uppercase amber-glow">
                  ID // EDITOR_01
                </p>
                <h1
                  className="font-display glitch-text mt-3 text-3xl font-black tracking-tight text-signal sm:text-4xl"
                  data-text={profile.name.toUpperCase()}
                >
                  {profile.name.toUpperCase()}
                </h1>
                <p className="mt-2 font-mono text-xs tracking-[0.2em] text-phosphor uppercase">
                  Video Editor
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-phosphor/20 pt-3 font-mono text-[10px] text-muted">
                  <span>IN // 00:00:00:00</span>
                  <span className="text-phosphor">{formatTimecode(frames)}</span>
                  <span>OUT // READY</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
