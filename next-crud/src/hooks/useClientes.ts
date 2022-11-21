import { useState, useCallback, useEffect, useMemo } from 'react'
import ColecaoCliente from '../backend/db/ColecaoCliente'
import Cliente from '../core/Cliente'
import ClienteRepositorio from '../core/ClienteRepositori'
import useTabelaOuForm from './useTabelaOuForm'

export default function useClientes() {
  const repo: ClienteRepositorio = new ColecaoCliente()
  const { tabelaVisivel, exibirFormulario, exibirTabela } = useTabelaOuForm()
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])

  const obterTodos = () => {
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      exibirTabela()
    })
  }

  useEffect(() => {
    obterTodos()
  }, [])

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente)
    exibirFormulario()
  }

  async function excluirCliente(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  function novoCliente() {
    setCliente(Cliente.vazio())
    exibirFormulario()
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }

  return {
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
    exibirTabela,
    clientes,
    cliente,
    tabelaVisivel,
  }
}
