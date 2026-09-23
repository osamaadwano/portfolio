import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  label?: string
}

export function MonitorBezel({ children, className = '', label = 'PGM' }: Props) {
  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      <span className="pointer-events-none absolute -top-px -left-px z-20 h-5 w-5 border-t-2 border-l-2 border-phosphor shadow-[0_0_12px_var(--color-phosphor)]" />
      <span className="pointer-events-none absolute -top-px -right-px z-20 h-5 w-5 border-t-2 border-r-2 border-phosphor shadow-[0_0_12px_var(--color-phosphor)]" />
      <span className="pointer-events-none absolute -bottom-px -left-px z-20 h-5 w-5 border-b-2 border-l-2 border-amber shadow-[0_0_12px_var(--color-amber)]" />
      <span className="pointer-events-none absolute -right-px -bottom-px z-20 h-5 w-5 border-r-2 border-b-2 border-amber shadow-[0_0_12px_var(--color-amber)]" />

      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="size-1.5 bg-amber shadow-[0_0_10px_var(--color-amber)]" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-phosphor uppercase phosphor-glow">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-muted uppercase">
          <span className="text-track-a">SYS.OK</span>
          <span className="text-phosphor/60">NEURAL</span>
        </div>
      </div>

      <div className="clip-frame relative overflow-hidden bg-bay neon-border">
        {children}
        <div className="cyber-grid-fine absolute inset-0 z-10 opacity-40" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgb(5_6_10/0.55)_100%)]" />
      </div>
    </div>
  )
}
