const method = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({
      nome: 'Patrick',
    })
  } else {
    res.status(200).json({
      nome: 'Priscila',
    })
  }
}

export default method
