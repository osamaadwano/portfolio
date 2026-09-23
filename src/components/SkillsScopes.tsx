import { motion } from 'framer-motion'
import { skills } from '../data/cv'

const groupAccent: Record<string, string> = {
  Software: '#00e8f0',
  Editing: '#b8ff3c',
  Color: '#7b8cff',
  Sound: '#6dff9a',
  'Motion & VFX': '#e8c547',
  Industries: '#8ab4ff',
}

const ease = [0.22, 1, 0.36, 1] as const

export function SkillsScopes() {
  const groups = [...new Set(skills.map((s) => s.group))]

  return (
    <section id="skills" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.28em] text-amber uppercase">
            Skills
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Toolkit
          </h2>
        </header>

        <div className="space-y-8">
          {groups.map((group) => {
            const accent = groupAccent[group] ?? '#00e8f0'
            const items = skills.filter((s) => s.group === group)

            return (
              <div key={group}>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: accent }}
                  />
                  <h3 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                    {group}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03, duration: 0.55, ease }}
                      className="rounded-sm border border-phosphor/15 bg-bay-raised/70 px-3.5 py-2 font-mono text-xs tracking-wide text-signal"
                    >
                      {skill.label}
                    </motion.span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
