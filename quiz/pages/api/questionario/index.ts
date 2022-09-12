import questoes from '../bancoDeQuestoes'

export default (req, res) => {
  questoes.map(questao => questao.id)
  res.status(200).json(questoes.map(questao => questao.id))
}
