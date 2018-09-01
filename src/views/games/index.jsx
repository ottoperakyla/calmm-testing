import Tictactoe from "./tic-tac-toe.jsx"
import MemoryGame from "./memory-game.jsx"
import PageNotFound from '../PageNotFound.jsx'
import {getGrid} from '../../utils/Grid.js'
import emojis from './emojis'

const randomEmojis = []
const pairsCount = 8

for (let i = 0; i < pairsCount; i++) {
  const randomEmoji = R.head(emojis.splice(Math.round(Math.random() * emojis.length), 1))
  randomEmojis.push(randomEmoji)
}

const subViews = {
  'tic-tac-toe': Tictactoe,
  'memory-game': MemoryGame
}

const componentParams = {
  'tic-tac-toe': {
    grid: U.atom(getGrid(3, 3))
  },
  'memory-game': {
    rawPieces: randomEmojis
  }
}

const Games = ({ subView }) => {
  const Component = subViews[subView] || PageNotFound
 
  return (
      <div>
         <p>Games!</p>
         <Component {...componentParams[subView] || {}}/>
      </div>
  )
}

export default Games