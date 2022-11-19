import { useState } from 'react'
import { AuthInput } from '../components/auth/AuthInput'

export default function Autenticacao() {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login')
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  return (
    <div>
      <h1>Autenticação</h1>
      <AuthInput
        label='Email'
        tipo='email'
        valor={email}
        valorMudou={setEmail}
      />
      <AuthInput
        label='Senha'
        tipo='password'
        valor={senha}
        valorMudou={setSenha}
      />
    </div>
  )
}
