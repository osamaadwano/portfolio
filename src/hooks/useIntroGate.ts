import { useCallback, useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const STORAGE_KEY = 'osama-intro-seen'

export function useIntroGate() {
  const reduced = usePrefersReducedMotion()
  const [showIntro, setShowIntro] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY) === '1'
    if (reduced || seen) {
      setShowIntro(false)
    } else {
      setShowIntro(true)
      document.body.classList.add('intro-lock')
    }
    setReady(true)
  }, [reduced])

  const complete = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    document.body.classList.remove('intro-lock')
    setShowIntro(false)
  }, [])

  return { ready, showIntro, complete }
}
