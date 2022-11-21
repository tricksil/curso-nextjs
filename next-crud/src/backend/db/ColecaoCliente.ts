import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
} from 'firebase/firestore'
import Cliente from '../../core/Cliente'
import ClienteRepositorio from '../../core/ClienteRepositori'
import { db } from '../../firebase/config'

export default class ColecaoCliente implements ClienteRepositorio {
  #conversor = {
    toFirestore: (cliente: Cliente) => {
      return {
        nome: cliente.nome,
        idade: +cliente.idade,
      }
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Cliente => {
      const dados = snapshot?.data(options)
      return new Cliente(dados.nome, dados.idade, snapshot.id)
    },
  }

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await setDoc(this.#colecao(cliente.id as string), cliente)
      return cliente
    } else {
      const docRef = await addDoc(this.#colecaoWithouDoc, cliente)
      const doc = await getDoc(docRef)
      return doc.data() as Cliente
    }
  }
  async excluir(cliente: Cliente): Promise<void> {
    return await deleteDoc(this.#colecao(cliente.id as string))
  }

  async obterTodos(): Promise<Cliente[]> {
    const querySnapshot = await getDocs(this.#colecaoWithouDoc)
    return querySnapshot.docs.map(doc => doc.data())
  }

  #colecao(id: string) {
    return doc(db, 'clientes', id).withConverter(this.#conversor)
  }

  get #colecaoWithouDoc() {
    return collection(db, 'clientes').withConverter(this.#conversor)
  }
}
