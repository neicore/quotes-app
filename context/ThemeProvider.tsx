import { createContext, ReactNode, useEffect, useState } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export const AppContext = createContext(
  {} as { mode: string | null; setMode: Function }
)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<string | null>('')

  useEffect(() => {
    if (localStorage.getItem('mode')) {
      return setMode(localStorage.getItem('mode'))
    }

    const userModePreferenceChange = (event: MediaQueryListEvent) => {
      setMode(event.matches ? 'dark' : 'light')
      return localStorage.setItem('mode', event.matches ? 'dark' : 'light')
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', userModePreferenceChange)

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return setMode('dark')
    }

    return window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', userModePreferenceChange)
  }, [])

  return (
    <AppContext.Provider value={{ mode, setMode }}>
      {children}
    </AppContext.Provider>
  )
}
export default ThemeProvider
