import type { ReactNode } from 'react'

type Props = {
  index: string
  kicker: string
  title: string
  lede?: ReactNode
}

export function SectionMark({ index, kicker, title, lede }: Props) {
  return (
    <header className="mb-6 sm:mb-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.22em] text-phosphor tabular-nums">
          {index}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-phosphor/45 via-phosphor/15 to-transparent" />
      </div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-amber uppercase">
        {kicker}
      </p>
      <h2 className="font-display mt-1.5 text-[1.7rem] leading-none font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{lede}</p>
      ) : null}
    </header>
  )
}
