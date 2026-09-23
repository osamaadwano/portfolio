import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../data/cv'
import { formatTimecode } from '../hooks/useTimecode'

type Phase = 'boot' | 'link' | 'id'

type Props = {
  onComplete: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

export function OpeningIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('boot')
  const [frames, setFrames] = useState(0)
  const [bootLines, setBootLines] = useState(0)

  const lines = [
    '> Init edit core…',
    '> Sync color & audio…',
    '> Link established',
  ]

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('link'), 1800)
    const t2 = window.setTimeout(() => setPhase('id'), 3200)
    const t3 = window.setTimeout(() => onComplete(), 5600)
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
    }, 420)
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
      transition={{ duration: 0.55, ease }}
      role="dialog"
      aria-label="Opening sequence"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_232_240/0.06),transparent_55%)]" />

      <button
        type="button"
        onClick={onComplete}
        className="absolute top-5 right-5 z-20 font-mono text-[11px] tracking-[0.18em] text-muted uppercase transition duration-300 hover:text-phosphor"
      >
        Esc · Skip
      </button>

      <div className="relative aspect-video w-[min(92vw,720px)] overflow-hidden rounded-sm border border-phosphor/20 bg-bay-raised">
        <AnimatePresence mode="wait">
          {phase === 'boot' && (
            <motion.div
              key="boot"
              className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="mb-4 font-mono text-[10px] tracking-[0.28em] text-amber uppercase">
                Boot
              </p>
              <ul className="space-y-2.5 font-mono text-xs text-phosphor sm:text-sm">
                {lines.slice(0, bootLines).map((line) => (
                  <motion.li
                    key={line}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    {line}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {phase === 'link' && (
            <motion.div
              key="link"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <motion.div
                className="absolute inset-x-8 h-px bg-gradient-to-r from-transparent via-phosphor/80 to-transparent"
                animate={{ top: ['22%', '78%'] }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
              <p className="font-mono text-xs tracking-[0.28em] text-phosphor uppercase">
                Syncing
              </p>
              <p className="mt-3 font-mono text-[10px] text-muted tabular-nums">
                {formatTimecode(frames)}
              </p>
            </motion.div>
          )}

          {phase === 'id' && (
            <motion.div
              key="id"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="w-[min(86%,400px)] rounded-sm border border-phosphor/25 bg-bay-panel/90 px-8 py-8 text-center">
                <p className="font-mono text-[10px] tracking-[0.28em] text-amber uppercase">
                  Editor
                </p>
                <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-signal sm:text-4xl">
                  {profile.name}
                </h1>
                <p className="mt-2 font-mono text-xs tracking-[0.16em] text-phosphor uppercase">
                  Video Editor
                </p>
                <div className="mt-6 border-t border-phosphor/15 pt-3 font-mono text-[10px] text-muted">
                  {formatTimecode(frames)} · Ready
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
