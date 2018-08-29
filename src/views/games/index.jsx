import Tictactoe from "./tic-tac-toe.jsx"
import PageNotFound from '../PageNotFound.jsx'
import Grid from '../../utils/Grid.js'

const subViews = {
  'tic-tac-toe': Tictactoe,
}

const componentParams = {
  // 'tic-tac-toe': {
  //   grid: new Grid(3, 3)
  // }
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