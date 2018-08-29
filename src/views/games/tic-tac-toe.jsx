import Grid from '../../utils/Grid.js'

const Tictactoe = ({ grid = U.atom(new Grid(3, 3)) }) => {
  grid.log()
  return (
      <div>
        <p>Tictactoe!</p>
        {grid.get().getGrid()}
        {renderGrid(grid.get().getGrid())}
        <button onClick={() => grid.set([])}>wat</button>
      </div>
  )
}

export default Tictactoe

function renderGrid(grid) {
  return (
    <table className="grid">
      <tbody>
      {grid.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {row.map((cell, cellIdx) => (
            <td key={cellIdx}>{cell}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}
