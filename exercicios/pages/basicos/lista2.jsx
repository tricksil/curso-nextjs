/* 

  <div>
    <span>1,</span>
    <span>2,</span>
    <span>3,</span>
    <span>4,</span>
    <span>5,</span>
    <span>6,</span>
    <span>7,</span>
    <span>8,</span>
    <span>9,</span>
    <span>10,</span>
  </div>

*/

export default function lista1() {
  const list = generateList(10)
  return list
}

function generateList(qtd) {
  return (
    <div>
      {Array.from({ length: qtd }).map((value, key) => (
        <span key={key}>{key + 1},</span>
      ))}
    </div>
  )
}
