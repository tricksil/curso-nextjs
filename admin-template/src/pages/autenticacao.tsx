import { useState } from 'react'
import { AuthInput } from '../components/auth/AuthInput'
import { IconeGoogle } from '../components/icons'

export default function Autenticacao() {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login')
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  function submeter() {
    if (modo === 'login') {
      console.log('login')
    } else {
      console.log('cadastrar')
    }
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <div className='w-1/2'>
        <h1
          className={`
        text-xl font-bold mb-5
      `}
        >
          {modo === 'login'
            ? 'Entre com a Sua Conta'
            : 'Cadastre-se na Plataforma'}
        </h1>
        <AuthInput
          label='Email'
          tipo='email'
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />
        <AuthInput
          label='Senha'
          tipo='password'
          valor={senha}
          valorMudou={setSenha}
          obrigatorio
        />
        <button
          onClick={submeter}
          className={`
        w-full bg-indigo-500 hover:bg-indigo-400
        text-white rounded-lg  px-4 py-3 mt-6
      `}
        >
          {modo === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
        <hr className='my-6 border-gray-300 w-full' />
        <button
          onClick={submeter}
          className={`
        border border-gray-900
        flex items-center justify-center
        w-full bg-white hover:bg-red-400
        text-gray-900 rounded-lg  px-4 py-3 mt-6
        
      `}
        >
          {IconeGoogle}
          {modo === 'login' ? (
            <span
              className={`
            ml-3
          `}
            >
              Entrar com o google
            </span>
          ) : (
            'Cadastrar com o google'
          )}
        </button>
      </div>
    </div>
  )
}
