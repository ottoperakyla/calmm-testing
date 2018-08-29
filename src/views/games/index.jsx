const Games = ({ subView, value1 = U.atom(''), value2 = U.atom('') }) => {
  const sum = U.add(value1, value2)
  
  return (
      <div>
         <p>Games!</p>
         <p>Show: {subView}</p>
      </div>
  )
}

export default Games