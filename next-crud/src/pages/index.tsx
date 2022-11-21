import Botao from '../components/Botao'
import Formulario from '../components/Formulario'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'

export default function Home() {
  const clientes = [
    new Cliente('Priscila', 21, '1'),
    new Cliente('Andrielly', 23, '2'),
    new Cliente('Patrick', 25, '3'),
    new Cliente('Pedro', 27, '4'),
  ]

  function clienteSelecionado(cliente: Cliente) {
    console.log(cliente.nome)
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir... ${cliente.nome}`)
  }

  return (
    <div
      className={`
        flex justify-center items-center h-screen
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white
    `}
    >
      <Layout titulo='Cadastro Simples'>
        <div className='flex justify-end'>
          <Botao className='mb-4' cor='green'>
            Novo Cliente
          </Botao>
        </div>
        <Tabela
          clientes={clientes}
          clienteSelecionado={clienteSelecionado}
          clienteExcluido={clienteExcluido}
        ></Tabela>
        <Formulario cliente={clientes[0]} />
      </Layout>
    </div>
  )
}
