import { useEffect, useState } from 'react'

const ids = ['work', 'experience', 'skills', 'contact'] as const

export type SectionId = (typeof ids)[number]

/** Section whose top has crossed a line just under the header. */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    let frame = 0
    const update = () => {
      const line = Math.min(window.innerHeight * 0.35, 220)
      let next: SectionId | null = null
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top <= line) {
          next = node.id as SectionId
        }
      })
      setActive(next)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return active
}
