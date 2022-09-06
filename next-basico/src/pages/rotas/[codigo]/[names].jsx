import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Names() {
  const router = useRouter()
  const codigo = router.query.codigo
  const names = router.query.names

  return (
    <div>
      <h1>
        Rotas / {codigo} / Buscar / {names}
      </h1>
      <Link href='/rotas' passHref>
        <button>Voltar</button>
      </Link>
    </div>
  )
}
