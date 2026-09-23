type Props = {
  value: string
  className?: string
}

export function Timecode({ value, className = '' }: Props) {
  return (
    <span
      className={`font-mono text-sm tracking-wider text-phosphor tabular-nums phosphor-glow ${className}`}
    >
      {value}
    </span>
  )
}
