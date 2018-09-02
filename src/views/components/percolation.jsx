import {Grid, classNames, matrix} from '../../utils/util.js'

const traversePercolation = (m, percolates) => {
  percolates.set(false)
  const reachesBottom = x => x === m.length - 1

  const outOfBounds = (x, y) =>
    x < 0 || y < 0 || x > m.length - 1 || (m[x] && y > m[x].length - 1)

  const walk = ([x, y]) => {
    if (outOfBounds(x, y) || m[x][y].full || !m[x][y].open) {
      return
    }

    m[x][y].full = true

    if (reachesBottom(x)) {
      percolates.set(true)
      return
    }

    walk([x - 1, y])
    walk([x + 1, y])
    walk([x, y + 1])
    walk([x, y - 1])
  }

  const firstRowOpens = R.pipe(
    R.head,
    R.filter(R.propEq('open', true)),
    R.map(q => [0, m[0].indexOf(q)])
  )(m)
  
  if (!firstRowOpens.length) {
    return false
  }

  firstRowOpens.forEach(walk)

  return m
}

const getPercolation = (m, openProbability) => R.map(nested => 
  R.map(() => ({open: Math.random() < openProbability, full: false}), nested)
)(m)

const Percolation = ({ size = U.atom(8), openProbability = U.atom(0.5), percolates = U.atom(false) }) => {
  const m = matrix(size.get())
  const percolationMatrix = U.atom(getPercolation(m, openProbability.get()))

  percolationMatrix.modify(m => traversePercolation(m, percolates))

  return (
    <div className="percolation">
      {Grid(percolationMatrix, ({open, full}, rowIndex, colIndex) => 
        <td className={classNames('grid__piece-container', {open, full})} key={colIndex}>
          <div className="grid__piece">&nbsp;</div>
        </td>
      )}
      <div>
        <form onSubmit={e => {
          e.preventDefault()

          const openProbVal = parseInt(openProbability.get()) / 100
          const openProb = openProbVal > 0 ? openProbVal : 0.5 
          const m = matrix(size.get())
          const perc = getPercolation(m, openProb)

          percolationMatrix.set(traversePercolation(perc, percolates))
        }}>
          <fieldset>
            <label htmlFor="size">Size</label>
            <input onChange={e => size.set(e.target.value)} value={size} type="number" id="size" min="4" max="32" />
          </fieldset>

          <fieldset>
            <label htmlFor="probability">Open probability (%)</label>
            <input onChange={e => openProbability.set(e.target.value)} type="number" id="probability" min="1" max="99" />
          </fieldset>

          <button>Run</button>
        </form>
        <div>{U.ifte(percolates, 'percolates', 'does not percolate')}</div>
      </div>
    </div>
  )
}

export default Percolation
