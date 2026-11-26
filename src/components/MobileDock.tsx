import { motion } from 'framer-motion'
import { useActiveSection, type SectionId } from '../hooks/useActiveSection'

const links: { id: SectionId; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Roles' },
  { id: 'skills', label: 'Tools' },
  { id: 'contact', label: 'Contact' },
]

export function MobileDock() {
  const active = useActiveSection()
  const index = Math.max(
    0,
    links.findIndex((link) => link.id === active),
  )

  return (
    <nav
      className="fixed inset-x-3 bottom-[max(0.55rem,env(safe-area-inset-bottom))] z-40 sm:hidden"
      aria-label="Sections"
    >
      <ul className="relative grid grid-cols-4 overflow-hidden rounded-full border border-phosphor/20 bg-bay/80 p-1 shadow-[0_12px_40px_-18px_rgb(0_0_0/0.85)] backdrop-blur-md">
        {active && (
          <motion.span
            aria-hidden
            className="absolute top-1 bottom-1 left-1 rounded-full bg-phosphor/15"
            style={{ width: 'calc((100% - 0.5rem) / 4)' }}
            initial={false}
            animate={{ x: `${index * 100}%` }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        )}
        {links.map((link) => {
          const on = active === link.id
          return (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                aria-current={on ? 'true' : undefined}
                className={`relative z-10 flex min-h-11 items-center justify-center rounded-full font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                  on ? 'text-phosphor' : 'text-muted'
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
