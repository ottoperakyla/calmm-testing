import {Grid, classNames, chunk, matrix, log} from '../../utils/util.js'

const Percolation = ({ size = 8, openProbability = 0.5 }) => {
  const m = matrix(size)
  
  const getPercolation = R.pipe(
    R.flatten,
    R.map(() => ({open: Math.random() < openProbability, closed: false, full: false})),
    chunk(size)
  )

  const percolationMatrix = U.atom(getPercolation(m))
  console.log({percolationMatrix, m})

  return (
    <div className="percolation">
      {Grid(percolationMatrix, ({value, open, closed, full}, rowIndex, colIndex) => 
        <div
        className={classNames('grid__piece-container', {open, closed, full})} key={colIndex}>
          <div className="grid__piece"></div>
        </div>
      )}
      <div>
        <button onClick={() => percolationMatrix.set(getPercolation(m))}>Reset</button>
      </div>
    </div>
  )
}

export default Percolation
