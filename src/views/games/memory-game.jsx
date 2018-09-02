import {shuffle, classNames, double, chunk, Grid} from '../../utils/util.js'

const MemoryGame = ({ rawPieces, unflip = U.atom(false), getRandomPieces }) => {
  const initPiece = rawPiece => 
    ({emoji: rawPiece[0], text: rawPiece[1], visible: false, revealed: false})

  const initPieces = R.pipe(
    R.map(R.pipe(initPiece, double)),
    R.flatten,
    shuffle,
    chunk(4)
  )
  
  const isLockedState = R.map(
    R.pipe(
      R.flatten,
      R.filter(R.propEq('visible', true)),
      R.prop('length'),
      R.lte(2)
    )
  )

  const pieces = U.atom(initPieces(rawPieces))
  const lockedState = isLockedState(pieces)

  lockedState.log()
  return (
    <div className="memory-game">
      {Grid(pieces, ({emoji, text, visible, revealed}, rowIndex, colIndex) => 
        <td
        onClick={() => pieces.view([rowIndex, colIndex, 'visible']).modify(R.not)}
        title={text} className="grid__piece-container touchable" key={colIndex}>
          <div className={classNames('grid__piece', {flip: visible})}>{emoji}</div>
        </td>
      )}
      <div>
        <button onClick={() => unflip.modify(R.not)}>Unflip</button>
        <button onClick={() => pieces.set(initPieces(getRandomPieces()))}>Reset</button>
      </div>
    </div>
  )
}

export default MemoryGame
