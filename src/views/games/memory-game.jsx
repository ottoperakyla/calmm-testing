import {shuffle, classNames, double, chunk} from '../../utils/util.js'

const MemoryGame = ({ pieces, unflip = U.atom(false) }) => {
  const initPieces = R.pipe(
    R.map(
      R.pipe(
        piece => ({emoji: piece[0], text: piece[1], visible: false, revealed: false}),
        double
      )
    ),
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

  pieces = U.atom(initPieces(pieces))
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
