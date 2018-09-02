import Storage from '../../utils/Storage.js'
import Todolist from './todo-list.jsx'
import Calendar from './calendar.jsx'
import CountDown from './count-down.jsx'
import DraggableList from './draggable-list.jsx'
import Percolation from './percolation.jsx'
import PageNotFound from '../PageNotFound.jsx'
import GithubLink from '../../utils/github-link.jsx'


const subViews = {
  'todo-list': Todolist,
  'calendar': Calendar,
  'count-down': CountDown,
  'draggable-list': DraggableList,
  'percolation': Percolation
}

const defaultTodos = [
  {title: 'buy beer', completed: true},
  {title: 'eat food', completed: false},
  {title: 'code something', completed: false}
]
const todoStorage = new Storage('todolist', defaultTodos)

const componentParams = {
  'count-down': {
    timeTo: U.atom(+new Date() + 27905000)
  },
  'draggable-list': {
    items: U.atom([
      'wat',
      'wat',
      'in',
      'the',
      'butt?'
    ])
  },
  'todo-list': {
    storage: todoStorage
  },
  percolation: {
    description: '<a target="_blank" href="https://en.wikipedia.org/wiki/Percolation_theory">Percolation in wikipedia</a>'
  }
}

const Components = ({ subView }) => {
  const Component = subViews[subView] || PageNotFound
  
  return (
      <div>
        <Component {...componentParams[subView] || {}}/>
        <GithubLink description={R.pathOr(false, [subView, 'description'], componentParams)} path={`components/${subView}.jsx`} />
      </div>
  )
}

export default Components
