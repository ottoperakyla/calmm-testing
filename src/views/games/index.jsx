import Tictactoe from "./tic-tac-toe.jsx"
import MemoryGame from "./memory-game.jsx"
import PageNotFound from '../PageNotFound.jsx'
import {getGrid} from '../../utils/Grid.js'
import emojis from './emojis'
import GithubLink from '../../utils/github-link.jsx'

const getRandomPieces = pairsCount => {
  const randomEmojis = []

  for (let i = 0; i < pairsCount; i++) {
    const randomEmoji = R.head(emojis.splice(Math.round(Math.random() * emojis.length), 1))
    randomEmojis.push(randomEmoji)
  }

  return randomEmojis
}

const subViews = {
  'tic-tac-toe': Tictactoe,
  'memory-game': MemoryGame
}

const pairsCount = 8
const componentParams = {
  'tic-tac-toe': {
    grid: U.atom(getGrid(3, 3))
  },
  'memory-game': {
    rawPieces: getRandomPieces(pairsCount),
    getRandomPieces: () => getRandomPieces(pairsCount)
  }
}

const Games = ({ subView }) => {
  const Component = subViews[subView] || PageNotFound
 
  return (
      <div>
         <p>Games!</p>
         <Component {...componentParams[subView] || {}}/>
         <GithubLink path={`games/${subView}.jsx`} />
      </div>
  )
}

export default Games