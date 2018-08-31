import emojis from './emojis'

const randomEmojis = []
const pairsCount = 8
const double = x => [x, x]
const chunk = count => array => {
  const nested = []
  for (let i = 0; i < array.length; i += count) {
    nested.push(array.slice(i, i + count))
  }
  return nested
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }
  return a
}

for (let i = 0; i < pairsCount; i++) {
  randomEmojis.push(emojis[Math.round(Math.random() * emojis.length)])
}

const formattedEmojis = R.pipe(
  R.map(
    R.pipe(
      (e) => ({emoji: e[0], text: e[1], visible: false, revealed: false}),
      double
    )
  ),
  R.flatten,
  shuffle,
  chunk(4)
)

const doubled = formattedEmojis(randomEmojis)

console.log({randomEmojis, doubled})

const MemoryGame = ({ pieces = U.atom(doubled) }) => {
  const isLockedState = R.map(
    R.pipe(
      R.flatten,
      R.filter(R.propEq('visible', true)),
      R.prop('length'),
      R.lte(2)
    )
  )
  const lockedState = isLockedState(pieces)

  lockedState.log()
  return (
    <div className="memory-game">
      {U.mapIndexed((column, rowIndex) => 
        <div key={rowIndex} className="memory-game__row">
          {column.map(({emoji, text, visible, revealed}, colIndex) => 
            <div
            onClick={() => pieces.view([rowIndex, colIndex, 'visible']).modify(R.not)}
            title={text} className="memory-game__piece-container" key={colIndex}>
              {!visible && <div className="memory-game__piece-mask touchable"></div>}
              <div className="memory-game__piece">{emoji}</div>
            </div>
          )}
        </div>,
        pieces
      )}
    </div>
  )
}

export default MemoryGame
