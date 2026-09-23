import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { workBins, type WorkBin } from '../data/cv'
import { formatTimecode } from '../hooks/useTimecode'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { MonitorBezel } from './MonitorBezel'

const ease = [0.22, 1, 0.36, 1] as const

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function mediaSrc(src: string) {
  return src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src}`
}

function ThumbVideo({
  bin,
  onDuration,
}: {
  bin: WorkBin
  onDuration: (id: string, seconds: number) => void
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const poster = bin.poster ? mediaSrc(bin.poster) : undefined

  // Vertical / hard-to-seek clips: show a static poster image
  if (poster) {
    return (
      <>
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />
        {/* Hidden probe for duration only */}
        <video
          ref={ref}
          src={mediaSrc(bin.src)}
          muted
          playsInline
          preload="metadata"
          className="pointer-events-none absolute size-0 opacity-0"
          onLoadedMetadata={() => {
            const v = ref.current
            if (!v) return
            if (Number.isFinite(v.duration) && v.duration > 0) {
              onDuration(bin.id, v.duration)
            }
          }}
        />
      </>
    )
  }

  return (
    <video
      ref={ref}
      src={mediaSrc(bin.src)}
      muted
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
      onLoadedMetadata={() => {
        const v = ref.current
        if (!v) return
        if (Number.isFinite(v.duration) && v.duration > 0) {
          onDuration(bin.id, v.duration)
        }
        try {
          v.currentTime = Math.min(0.8, Math.max(0.1, v.duration * 0.08))
        } catch {
          /* ignore seek errors before ready */
        }
      }}
    />
  )
}

export function TimelineWork() {
  const reduced = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = workBins.find((b) => b.id === activeId) ?? null
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [durations, setDurations] = useState<Record<string, number>>({})
  const [playerOpen, setPlayerOpen] = useState(false)

  useEffect(() => {
    if (!playerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [playerOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && playerOpen) {
        closePlayer()
        return
      }
      if (e.key !== ' ' || !playerOpen || !active) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return
      e.preventDefault()
      togglePlay()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, playerOpen, playing, duration])

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

  function onPlayerMeta(bin: WorkBin) {
    const v = videoRef.current
    if (!v) return
    setDuration(v.duration)
    setDurations((d) => ({ ...d, [bin.id]: v.duration }))
  }

  function selectClip(id: string) {
    setActiveId(id)
    setPlaying(false)
    setCurrent(0)
    setDuration(0)
    setPlayerOpen(true)
  }

  function closePlayer() {
    videoRef.current?.pause()
    setPlaying(false)
    setPlayerOpen(false)
  }

  function rememberDuration(id: string, seconds: number) {
    setDurations((d) => (d[id] === seconds ? d : { ...d, [id]: seconds }))
  }

  return (
    <section id="work" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.28em] text-amber uppercase">
            Work
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Selected cuts
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Click a cut to open the player.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {workBins.map((bin, i) => {
            const d = durations[bin.id]
            return (
              <motion.button
                key={bin.id}
                type="button"
                onClick={() => selectClip(bin.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.05, duration: 0.55, ease }}
                className={`group relative overflow-hidden rounded-sm border border-phosphor/15 bg-bay-raised/50 text-left shadow-[0_12px_40px_-28px_rgb(0_0_0/0.8)] transition-[transform,border-color,box-shadow] duration-300 hover:z-10 hover:border-phosphor/40 hover:shadow-[0_20px_50px_-24px_rgb(0_232_240/0.25)] focus-visible:z-10 focus-visible:border-phosphor/50 focus-visible:outline-none ${
                  reduced ? '' : 'hover:scale-[1.03]'
                }`}
              >
                <div className="relative aspect-video overflow-hidden bg-bay">
                  <ThumbVideo bin={bin} onDuration={rememberDuration} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bay via-bay/40 to-transparent" />

                  <span
                    className="absolute top-0 left-0 h-full w-1"
                    style={{ background: bin.accent }}
                    aria-hidden
                  />

                  <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-sm border border-phosphor/35 bg-bay/70 text-phosphor opacity-90 transition duration-300 group-hover:border-phosphor/60 group-hover:bg-phosphor/15">
                    <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <div className="flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-mono text-sm tracking-[0.1em] text-signal">
                          {bin.label}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted">
                          {bin.note}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-phosphor/90 tabular-nums">
                        {d ? formatClock(d) : '—:—'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {playerOpen && active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-stretch justify-center bg-bay/95 p-4 backdrop-blur-md sm:items-center sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            role="dialog"
            aria-modal="true"
            aria-label={`Playing ${active.label}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closePlayer()
            }}
          >
            <motion.div
              className="flex h-full w-full max-w-5xl flex-col sm:h-auto sm:max-h-[min(90svh,820px)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                    Now playing
                  </p>
                  <p className="truncate font-mono text-sm text-signal">
                    {active.label}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePlayer}
                  className="shrink-0 rounded-sm border border-phosphor/30 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-phosphor uppercase transition hover:border-phosphor/60"
                >
                  Close
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col sm:min-h-[min(70svh,560px)]">
                <MonitorBezel label={active.label} fill>
                  <div className="absolute inset-0 bg-black">
                    <video
                      ref={videoRef}
                      key={active.id}
                      src={mediaSrc(active.src)}
                      className="absolute inset-0 h-full w-full object-contain"
                      playsInline
                      preload="metadata"
                      autoPlay
                      onLoadedMetadata={() => onPlayerMeta(active)}
                      onTimeUpdate={() =>
                        setCurrent(videoRef.current?.currentTime ?? 0)
                      }
                      onPlay={() => setPlaying(true)}
                      onPause={() => setPlaying(false)}
                      onEnded={() => setPlaying(false)}
                      onClick={togglePlay}
                    />
                    <AnimatePresence>
                      {!playing && (
                        <motion.button
                          type="button"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          onClick={togglePlay}
                          className="absolute inset-0 z-10 flex items-center justify-center bg-bay/25"
                          aria-label="Play"
                        >
                          <span className="flex size-14 items-center justify-center rounded-sm border border-phosphor/40 bg-bay/70 text-phosphor">
                            <span className="ml-0.5 border-y-[8px] border-l-[14px] border-y-transparent border-l-current" />
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </MonitorBezel>

                <div className="mt-3 flex shrink-0 flex-col gap-2 rounded-sm border border-phosphor/15 bg-bay-raised/90 px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={playing ? 'Pause' : 'Play'}
                      className="flex size-10 items-center justify-center rounded-sm border border-phosphor/30 bg-bay-panel text-phosphor"
                    >
                      {playing ? (
                        <span className="flex gap-0.5">
                          <span className="h-3.5 w-0.5 bg-current" />
                          <span className="h-3.5 w-0.5 bg-current" />
                        </span>
                      ) : (
                        <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" />
                      )}
                    </button>
                    <span className="truncate font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                      {active.label}
                    </span>
                    <span className="ml-auto font-mono text-xs text-phosphor tabular-nums">
                      {formatTimecode(Math.floor(current * 25))} /{' '}
                      {formatClock(duration)}
                    </span>
                  </div>
                  <div
                    className="relative h-1.5 cursor-pointer rounded-full bg-bay-panel"
                    role="slider"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={
                      duration ? Math.round((current / duration) * 100) : 0
                    }
                    tabIndex={0}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      seek(
                        Math.min(
                          1,
                          Math.max(0, (e.clientX - rect.left) / rect.width),
                        ),
                      )
                    }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-phosphor to-amber"
                      style={{
                        width: duration
                          ? `${(current / duration) * 100}%`
                          : '0%',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
