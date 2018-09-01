import {shuffle, classNames, double, chunk} from '../../utils/util.js'

const MemoryGame = ({ rawPieces, unflip = U.atom(false) }) => {
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
      {U.mapIndexed((column, rowIndex) => 
        <div key={rowIndex} className="memory-game__row">
          {column.map(({emoji, text, visible, revealed}, colIndex) => 
            <div
            onClick={() => pieces.view([rowIndex, colIndex, 'visible']).modify(R.not)}
            title={text} className="memory-game__piece-container touchable" key={colIndex}>
              <div className={classNames({'memory-game__piece': true, flip: visible})}>{emoji}</div>
            </div>
          )}
        </div>,
        pieces
      )}
      <div>
        <button onClick={() => unflip.modify(R.not)}>Unflip</button>
      </div>
    </div>
  )
}

export default MemoryGame
