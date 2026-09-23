import { useEffect, useState } from 'react'

function pad(n: number, len = 2) {
  return String(n).padStart(len, '0')
}

export function formatTimecode(totalFrames: number, fps = 25) {
  const frames = totalFrames % fps
  const totalSeconds = Math.floor(totalFrames / fps)
  const s = totalSeconds % 60
  const m = Math.floor(totalSeconds / 60) % 60
  const h = Math.floor(totalSeconds / 3600)
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`
}

export function useTimecode(playing: boolean, fps = 25) {
  const [frames, setFrames] = useState(0)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setFrames((f) => f + 1)
    }, 1000 / fps)
    return () => window.clearInterval(id)
  }, [playing, fps])

  return formatTimecode(frames, fps)
}
