import { createContext, useEffect, useState } from 'react'

type Tema = 'dark' | ''

interface AppContextProps {
  tema?: string
  alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

interface AppProviderProps {
  children: any
}

export function AppProvider(props: AppProviderProps) {
  const [tema, setTema] = useState('')

  function alternarTema() {
    const temaEscolhido = tema === '' ? 'dark' : ''
    setTema(temaEscolhido)
    localStorage.setItem('tema', temaEscolhido)
  }

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as string
    setTema(temaSalvo)
  }, [])

  return (
    <AppContext.Provider
      value={{
        tema,
        alternarTema,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
