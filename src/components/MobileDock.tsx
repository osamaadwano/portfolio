import { useEffect, useState } from 'react'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Roles' },
  { id: 'skills', label: 'Tools' },
  { id: 'contact', label: 'Contact' },
] as const

export function MobileDock() {
  const [active, setActive] = useState<string>('work')

  useEffect(() => {
    const nodes = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => node !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed inset-x-3 bottom-[max(0.55rem,env(safe-area-inset-bottom))] z-40 sm:hidden"
      aria-label="Sections"
    >
      <ul className="grid grid-cols-4 rounded-full border border-phosphor/20 bg-bay/80 p-1 shadow-[0_12px_40px_-18px_rgb(0_0_0/0.85)] backdrop-blur-md">
        {links.map((link) => {
          const on = active === link.id
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={on ? 'true' : undefined}
                className={`flex min-h-11 items-center justify-center rounded-full font-mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
                  on ? 'bg-phosphor/15 text-phosphor' : 'text-muted'
                }`}
              >
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
