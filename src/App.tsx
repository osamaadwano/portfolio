import { AnimatePresence } from 'framer-motion'
import { ContactDeck } from './components/ContactDeck'
import { ExperienceTracks } from './components/ExperienceTracks'
import { OpeningIntro } from './components/OpeningIntro'
import { ProgramMonitor } from './components/ProgramMonitor'
import { SkillsScopes } from './components/SkillsScopes'
import { TimelineWork } from './components/TimelineWork'
import { profile } from './data/cv'
import { useIntroGate } from './hooks/useIntroGate'

export default function App() {
  const { ready, showIntro, complete } = useIntroGate()

  const contentVisible = ready && !showIntro

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && <OpeningIntro key="intro" onComplete={complete} />}
      </AnimatePresence>

      <div
        className={`min-h-screen transition-opacity duration-500 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!contentVisible}
      >
        <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-phosphor/20 bg-bay/85 px-4 py-3 backdrop-blur-md sm:px-8">
          <a
            href="#"
            className="font-display text-sm font-bold tracking-[0.12em] text-signal"
          >
            {profile.name.split(' ')[0].toUpperCase()}
            <span className="text-phosphor"> // EDIT</span>
          </a>
          <div className="hidden items-center gap-6 font-mono text-[10px] tracking-[0.22em] text-muted uppercase sm:flex">
            <a href="#work" className="hover:text-phosphor hover:phosphor-glow">
              Work
            </a>
            <a href="#experience" className="hover:text-phosphor">
              Experience
            </a>
            <a href="#skills" className="hover:text-phosphor">
              Skills
            </a>
            <a href="#contact" className="hover:text-amber">
              Contact
            </a>
          </div>
        </nav>

        <main className="pt-14">
          <ProgramMonitor />
          <TimelineWork />
          <ExperienceTracks />
          <SkillsScopes />
          <ContactDeck />
        </main>
      </div>
    </>
  )
}
