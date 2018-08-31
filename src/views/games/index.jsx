import Tictactoe from "./tic-tac-toe.jsx"
import MemoryGame from "./memory-game.jsx"
import PageNotFound from '../PageNotFound.jsx'
import {getGrid} from '../../utils/Grid.js'

const subViews = {
  'tic-tac-toe': Tictactoe,
  'memory-game': MemoryGame
}

const componentParams = {
  'tic-tac-toe': {
    grid: U.atom(getGrid(3, 3))
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