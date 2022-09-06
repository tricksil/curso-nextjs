import { useEffect, useState } from 'react'

export default function Questao() {
  const [questao, setQuestao] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/questao/123')
      .then(resp => resp.json())
      .then(json => setQuestao(json))
  }, [])

  function renderizarRespostas() {
    return questao?.respostas?.map(resp => {
      return <li key={resp}>{resp}</li>
    })
  }

  return (
    <div>
      <h1>Questão</h1>
      <div>
        <span>{questao?.enunciado}</span>
        <ul>{renderizarRespostas()}</ul>
      </div>
    </div>
  )
}
