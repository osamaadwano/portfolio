import { AnimatePresence } from 'framer-motion'
import { ContactDeck } from './components/ContactDeck'
import { ExperienceTracks } from './components/ExperienceTracks'
import { Hero } from './components/Hero'
import { OpeningIntro } from './components/OpeningIntro'
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
        className={`min-h-screen transition-opacity duration-700 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!contentVisible}
      >
        <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-phosphor/12 bg-bay/70 px-4 py-3 backdrop-blur-md sm:px-8">
          <a
            href="#"
            className="font-display text-sm font-bold tracking-[0.1em] text-signal"
          >
            {profile.name.split(' ')[0].toUpperCase()}
            <span className="text-phosphor"> · EDIT</span>
          </a>
          <div className="hidden items-center gap-6 font-mono text-[10px] tracking-[0.18em] text-muted uppercase sm:flex">
            <a href="#work" className="transition hover:text-phosphor">
              Work
            </a>
            <a href="#experience" className="transition hover:text-phosphor">
              Experience
            </a>
            <a href="#skills" className="transition hover:text-phosphor">
              Skills
            </a>
            <a href="#contact" className="transition hover:text-amber">
              Contact
            </a>
          </div>
        </nav>

        <main className="pt-14">
          <Hero />
          <TimelineWork />
          <ExperienceTracks />
          <SkillsScopes />
          <ContactDeck />
        </main>
      </div>
    </>
  )
}
