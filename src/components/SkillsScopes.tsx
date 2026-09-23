import { motion } from 'framer-motion'
import { skills } from '../data/cv'

const groupAccent: Record<string, string> = {
  Software: '#00f0ff',
  Editing: '#ff2d95',
  Color: '#7b5cff',
  Sound: '#39ff14',
  'Motion & VFX': '#ffaa00',
  Industries: '#ff6b4a',
}

export function SkillsScopes() {
  const groups = [...new Set(skills.map((s) => s.group))]

  return (
    <section id="skills" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-amber uppercase amber-glow">
            MODULES // NODE_MAP
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Skills
          </h2>
        </header>

        <div className="space-y-8">
          {groups.map((group) => {
            const accent = groupAccent[group] ?? '#00f0ff'
            const items = skills.filter((s) => s.group === group)

            return (
              <div key={group}>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="size-1.5"
                    style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                  />
                  <h3
                    className="font-mono text-[11px] tracking-[0.22em] uppercase"
                    style={{ color: accent }}
                  >
                    {group}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="clip-frame-sm relative border bg-bay-raised/80 px-4 py-2.5 font-mono text-xs tracking-wide text-signal"
                      style={{
                        borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
                      }}
                    >
                      <span
                        className="absolute top-1.5 left-1.5 size-1"
                        style={{
                          background: accent,
                          boxShadow: `0 0 6px ${accent}`,
                        }}
                      />
                      <span className="pl-2">{skill.label}</span>
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
