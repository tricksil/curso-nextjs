import route from 'next/router'
import { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth'
import Usuario from '../../model/Usuario'
import { auth } from '../../firebase/config'
import Cookies from 'js-cookie'

interface AuthContextProps {
  usuario?: Usuario
  carregando?: boolean
  login?: (email: string, senha: string) => Promise<void>
  cadastrar?: (email: string, senha: string) => Promise<void>
  loginGoogle?: () => Promise<void>
  logout?: () => Promise<void>
}

interface AuthProviderProps {
  children: any
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: User) {
  const token = await usuarioFirebase.getIdToken()
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName,
    email: usuarioFirebase.email,
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL,
  }
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set('admin-template-mp-auth', logado.toString(), {
      expires: 7,
    })
  } else {
    Cookies.remove('admin-template-mp-auth')
  }
}

export function AuthProvider(props: AuthProviderProps) {
  const [carregando, setCarregando] = useState(true)
  const [usuario, setUsuario] = useState<Usuario>()

  async function configurarSessao(usuarioFirebase: User | null) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase)
      setUsuario(usuario)
      gerenciarCookie(true)
      setCarregando(false)
      return usuario.email
    } else {
      setUsuario(undefined)
      gerenciarCookie(false)
      setCarregando(false)
      return false
    }
  }

  async function login(email: string, senha: string) {
    try {
      setCarregando(true)
      const resp = await signInWithEmailAndPassword(auth, email, senha)
      await configurarSessao(resp.user)
      route.push('/')
    } finally {
      setCarregando(false)
    }
  }

  async function cadastrar(email: string, senha: string) {
    try {
      setCarregando(true)
      const resp = await createUserWithEmailAndPassword(auth, email, senha)
      await configurarSessao(resp.user)
      route.push('/')
    } finally {
      setCarregando(false)
    }
  }

  async function loginGoogle() {
    try {
      setCarregando(true)
      const resp = await signInWithPopup(auth, new GoogleAuthProvider())
      await configurarSessao(resp.user)
      route.push('/')
    } finally {
      setCarregando(false)
    }
  }

  async function logout() {
    try {
      setCarregando(true)
      await signOut(auth)
      await configurarSessao(null)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    if (Cookies.get('admin-template-mp-auth')) {
      const cancelar = onIdTokenChanged(auth, configurarSessao)
      return () => cancelar()
    } else {
      setCarregando(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        logout,
        loginGoogle,
        login,
        cadastrar,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
