export default interface Usuario {
  uid: string
  nome: string | null
  email: string | null
  token: string
  provedor: string
  imagemUrl: string | null
}
