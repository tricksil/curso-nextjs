import { useState } from 'react'
import { AuthInput } from '../components/auth/AuthInput'
import { IconeAtencao, IconeGoogle } from '../components/icons'
import useAuth from '../data/hook/useAuth'
import { AuthError } from 'firebase/auth'

export default function Autenticacao() {
  const { cadastrar, login, loginGoogle } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [modo, setModo] = useState<'login' | 'cadastro'>('login')
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  async function submeter() {
    try {
      if (modo === 'login') {
        if (login) await login(email, senha)
      } else {
        if (cadastrar) await cadastrar(email, senha)
      }
    } catch (error: any) {
      exibirError(error?.message ?? 'Error desconhecido!')
    }
  }

  function exibirError(msg: string | null, tempoEmSegunos = 5) {
    setError(msg)
    setTimeout(() => setError(null), tempoEmSegunos * 1000)
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='hidden md:block md:w-1/2 lg:w-2/3'>
        <picture>
          <img
            src='https://source.unsplash.com/random'
            alt='Imagem da Tela de Autenticação'
            className='h-screen w-full object-cover'
          />
        </picture>
      </div>
      <div className='m-10 w-full md:w-1/2 lg:w-1/3'>
        <h1
          className={`
        text-3xl font-bold mb-5
      `}
        >
          {modo === 'login'
            ? 'Entre com a Sua Conta'
            : 'Cadastre-se na Plataforma'}
        </h1>
        {error ? (
          <div
            className={`
            flex items-center
            bg-red-400 text-white py-3 px-5 my-2
            border border-red-700 rounded-lg
          `}
          >
            {IconeAtencao()}
            <span className='ml-3 '>{error}</span>
          </div>
        ) : (
          false
        )}

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
          onClick={loginGoogle}
          className={`
        border border-gray-900 hover:border-none
        flex items-center justify-center
        w-full bg-white hover:bg-red-400 hover:text-white
        text-gray-900 rounded-lg  px-4 py-3 mt-6
        
      `}
        >
          {IconeGoogle}
          <span className='ml-3'>Entrar com o google</span>
        </button>
        {modo === 'login' ? (
          <p className='mt-8'>
            Novo por aqui?
            <a
              onClick={() => setModo('cadastro')}
              className={`
              text-blue-500 hover:text-blue-700 font-semibold
              cursor-pointer
            `}
            >
              {' '}
              Crie uma Conta Gratuitamente
            </a>
          </p>
        ) : (
          <p className='mt-8'>
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo('login')}
              className={`
              text-blue-500 hover:text-blue-700 font-semibold
              cursor-pointer
            `}
            >
              {' '}
              Entre com as suas Credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
