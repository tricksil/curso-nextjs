export default function handler(req, res) {
  const id = +req.query.id
  res.status(200).json({
    id,
    nome: `Iarlen Silva ${id}`,
    email: `iarlensilva${id}@gmail.com`,
  })
}
