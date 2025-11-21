import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Global UI settings persisted to localStorage
// These are purely client-side preferences (theme, density, motion, defaults)
const DEFAULTS = {
  theme: 'light', // 'light' | 'dark'
  density: 'comfortable', // 'comfortable' | 'compact'
  reduceMotion: false,
  defaultRegion: 'Any',
  defaultPass: 'Any',
  initials: 'AL'
}

const SettingsContext = createContext({
  settings: DEFAULTS,
  setSetting: (key, value) => {},
  reset: () => {}
})

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('peakcision:settings')
      return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS
    } catch {
      return DEFAULTS
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('peakcision:settings', JSON.stringify(settings))
      // Apply theme to document
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      document.documentElement.dataset.density = settings.density
    } catch {}
  }, [settings])

  const api = useMemo(() => ({
    settings,
    setSetting: (key, value) => setSettings((prev) => ({ ...prev, [key]: value })),
    reset: () => setSettings(DEFAULTS)
  }), [settings])

  return (
    <SettingsContext.Provider value={api}>{children}</SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
