import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  label?: string
  /** Stretch the screen to fill available height (flex parent required). */
  fill?: boolean
}

export function MonitorBezel({
  children,
  className = '',
  label = 'PGM',
  fill = false,
}: Props) {
  return (
    <div
      className={`relative ${fill ? 'flex min-h-0 flex-1 flex-col' : ''} ${className}`}
    >
      <div className="mb-2 flex shrink-0 items-center gap-2 px-0.5">
        <span className="size-1.5 rounded-full bg-phosphor/80" />
        <span className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
          {label}
        </span>
      </div>
      <div
        className={`relative overflow-hidden rounded-sm bg-bay neon-border ${
          fill ? 'min-h-0 flex-1' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}
