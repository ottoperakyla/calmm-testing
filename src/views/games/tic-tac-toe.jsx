const chars = ['x', 'o']

const Tictactoe = ({ grid, player = U.atom('x'), gameOver = U.atom(false) }) => {
  return (
      <div>
        <p>Tictactoe!</p>
        <p>Gameover: {gameOver.map(bool => bool.toString())}</p>
        {grid
        .map(g => renderGrid(g, (rowIdx, colIdx) => {
          if (!gameOver.get()) {
            const newGrid = R.clone(g)
            newGrid[rowIdx][colIdx] = player.get()

            player.modify(p => p === chars[0] ? chars[1] : chars[0])
            grid.set(newGrid)
          }
          if (isGameOver(grid.get())) {
            gameOver.set(true)
          }
        }))}
        <button onClick={() => grid.set([[5,6],[7,8]])}>wat</button>
      </div>
  )
}

export default Tictactoe

function renderGrid(grid, callback) {
  return (
    <table className="grid">
      <tbody>
      {grid.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {row.map((cell, colIdx) => (
            <td key={colIdx} onClick={() => callback(rowIdx, colIdx)}>{cell}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

function isGameOver(grid) {
  return grid[0][0] === grid[0][1] && grid[0][0] == grid[0][2] ||
         grid[1][0] === grid[1][1] && grid[1][0] == grid[1][2] ||
         grid[2][0] === grid[2][1] && grid[2][0] == grid[2][2] ||

         grid[0][0] === grid[1][0] && grid[0][0] === grid[2][0] ||
         grid[0][1] === grid[1][1] && grid[0][1] === grid[2][1] ||
         grid[0][2] === grid[1][2] && grid[0][2] === grid[2][2] ||

         grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2] ||
         grid[2][0] === grid[1][1] && grid[0][2] === grid[0][2]
}