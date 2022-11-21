import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'

export default function Home() {
  const clientes = [
    new Cliente('Priscila', 21, '1'),
    new Cliente('Debora', 21, '2'),
    new Cliente('Patrick', 25, '3'),
    new Cliente('Pedro', 27, '4'),
  ]
  return (
    <div
      className={`
        flex justify-center items-center h-screen
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white
    `}
    >
      <Layout titulo='Cadastro Simples'>
        <Tabela clientes={clientes}></Tabela>
      </Layout>
    </div>
  )
}
