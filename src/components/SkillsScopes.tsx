import { motion } from 'framer-motion'
import { skills } from '../data/cv'
import { useCoarsePointer } from '../hooks/useCoarsePointer'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionMark } from './SectionMark'

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
  const reduced = usePrefersReducedMotion()
  const coarse = useCoarsePointer()
  const calm = reduced || coarse
  const groups = [...new Set(skills.map((s) => s.group))]

  return (
    <section id="skills" className="relative scroll-mt-20 border-t border-phosphor/10 px-4 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionMark
          index="03"
          kicker="Skills"
          title="Toolkit"
          lede="The software and the craft behind the cut."
        />

        <div className="divide-y divide-phosphor/12 overflow-hidden rounded-sm border border-phosphor/15 bg-bay-raised/40">
          {groups.map((group) => {
            const accent = groupAccent[group] ?? '#00e8f0'
            const items = skills.filter((s) => s.group === group)

            return (
              <div key={group} className="px-4 py-4 sm:px-5 sm:py-5">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: accent }}
                  />
                  <h3 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                    {group}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill.id}
                      initial={calm ? false : { opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: calm ? 0 : i * 0.03, duration: 0.4, ease }}
                      className="rounded-sm border border-phosphor/15 bg-bay/70 px-3 py-2 font-mono text-xs tracking-wide text-signal"
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
