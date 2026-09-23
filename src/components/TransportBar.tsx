import { Timecode } from './Timecode'

type Props = {
  playing: boolean
  onToggle: () => void
  timecode: string
  progress?: number
  onSeek?: (ratio: number) => void
}

export function TransportBar({
  playing,
  onToggle,
  timecode,
  progress = 0,
  onSeek,
}: Props) {
  return (
    <div className="clip-frame-sm flex flex-col gap-2 border border-phosphor/25 bg-bay-raised/95 px-3 py-2.5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="flex size-8 items-center justify-center border border-phosphor/40 bg-bay-panel text-phosphor shadow-[0_0_16px_rgb(0_240_255/0.15)] transition hover:border-phosphor hover:bg-phosphor/10"
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

        <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] text-muted uppercase">
          <span className="text-danger phosphor-glow">● LIVE</span>
          <span>CH.01</span>
          <span className="text-amber">HUD</span>
          <span>4K</span>
        </div>

        <div className="ml-auto">
          <Timecode value={timecode} />
        </div>
      </div>

      <div
        className="group relative h-1.5 cursor-pointer bg-bay-panel"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        onClick={(e) => {
          if (!onSeek) return
          const rect = e.currentTarget.getBoundingClientRect()
          onSeek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
        }}
        onKeyDown={(e) => {
          if (!onSeek) return
          if (e.key === 'ArrowRight') onSeek(Math.min(1, progress + 0.05))
          if (e.key === 'ArrowLeft') onSeek(Math.max(0, progress - 0.05))
        }}
      >
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber via-phosphor to-phosphor shadow-[0_0_12px_var(--color-phosphor)]"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 bg-signal shadow-[0_0_10px_var(--color-phosphor)] transition group-hover:scale-125"
          style={{ left: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
