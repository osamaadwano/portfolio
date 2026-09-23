import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { workBins, type WorkBin } from '../data/cv'
import { formatTimecode } from '../hooks/useTimecode'
import { MonitorBezel } from './MonitorBezel'

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function TimelineWork() {
  const [activeId, setActiveId] = useState(workBins[0]?.id ?? null)
  const active = workBins.find((b) => b.id === activeId) ?? workBins[0]
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [durations, setDurations] = useState<Record<string, number>>({})

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.load()
    setPlaying(false)
    setCurrent(0)
  }, [active?.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' || !active) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return
      e.preventDefault()
      const v = videoRef.current
      if (!v) return
      if (v.paused) void v.play()
      else v.pause()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  function seek(ratio: number) {
    const v = videoRef.current
    if (!v || !duration) return
    v.currentTime = ratio * duration
    setCurrent(v.currentTime)
  }

  function onLoadedMeta(bin: WorkBin) {
    const v = videoRef.current
    if (!v) return
    setDuration(v.duration)
    setDurations((d) => ({ ...d, [bin.id]: v.duration }))
  }

  return (
    <section id="work" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-amber uppercase amber-glow">
            BIN // SEQUENCE
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Work
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Select a clip to load it into the program monitor.
          </p>
        </header>

        {active && (
          <div className="mb-8">
            <MonitorBezel label={`PGM // ${active.label}`}>
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  key={active.id}
                  src={`${import.meta.env.BASE_URL}${active.src}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={() => onLoadedMeta(active)}
                  onTimeUpdate={() =>
                    setCurrent(videoRef.current?.currentTime ?? 0)
                  }
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                  onClick={togglePlay}
                />
                <div className="cyber-grid-fine pointer-events-none absolute inset-0 opacity-20" />
                <AnimatePresence>
                  {!playing && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={togglePlay}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-bay/30"
                      aria-label="Play"
                    >
                      <span className="flex size-14 items-center justify-center border border-phosphor/50 bg-bay/80 text-phosphor shadow-[0_0_30px_rgb(0_240_255/0.25)]">
                        <span className="ml-1 border-y-[8px] border-l-[14px] border-y-transparent border-l-current" />
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </MonitorBezel>

            <div className="mt-3 flex flex-col gap-2 border border-phosphor/20 bg-bay-raised/90 px-3 py-2.5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause' : 'Play'}
                  className="flex size-8 items-center justify-center border border-phosphor/40 bg-bay-panel text-phosphor"
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
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {active.label}
                </span>
                <span className="ml-auto font-mono text-xs text-phosphor tabular-nums phosphor-glow">
                  {formatTimecode(Math.floor(current * 25))} /{' '}
                  {formatClock(duration)}
                </span>
              </div>
              <div
                className="relative h-1.5 cursor-pointer bg-bay-panel"
                role="slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={duration ? Math.round((current / duration) * 100) : 0}
                tabIndex={0}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  seek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber to-phosphor"
                  style={{
                    width: duration ? `${(current / duration) * 100}%` : '0%',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mb-2 flex justify-between font-mono text-[9px] tracking-wider text-muted/70">
          {['00:00', '00:15', '00:30', '00:45', '01:00'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="mb-6 h-px bg-phosphor/20" />

        <div className="flex flex-col gap-3">
          {workBins.map((bin, i) => {
            const selected = bin.id === active?.id
            const d = durations[bin.id]
            return (
              <motion.button
                key={bin.id}
                type="button"
                onClick={() => setActiveId(bin.id)}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`group relative flex items-stretch overflow-hidden border text-left transition ${
                  selected
                    ? 'border-phosphor/60 bg-phosphor/5 shadow-[0_0_24px_rgb(0_240_255/0.1)]'
                    : 'border-phosphor/20 bg-bay-raised hover:border-phosphor/40'
                }`}
              >
                <div
                  className="w-1.5 shrink-0"
                  style={{ background: bin.accent }}
                />
                <div className="flex flex-1 flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm font-medium tracking-[0.2em] text-signal">
                        {bin.label}
                      </span>
                      <span className="font-mono text-[10px] text-muted">
                        CLIP {String(i + 1).padStart(2, '0')}
                      </span>
                      {selected && (
                        <span className="font-mono text-[9px] tracking-[0.15em] text-phosphor uppercase">
                          // ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted">{bin.note}</p>
                  </div>
                  <span className="font-mono text-xs text-phosphor tabular-nums">
                    {d ? formatClock(d) : '—:—'}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
