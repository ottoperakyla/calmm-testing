import Storage from '../../utils/Storage.js'
import Todolist from './todo-list.jsx'
import Calendar from './calendar.jsx'
import CountDown from './count-down.jsx'
import DraggableList from './draggable-list.jsx'
import PageNotFound from '../PageNotFound.jsx'

const subViews = {
  'todo-list': Todolist,
  'calendar': Calendar,
  'count-down': CountDown,
  'draggable-list': DraggableList
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
  }
}

const Components = ({ subView }) => {
  const Component = subViews[subView] || PageNotFound
  
  return (
      <div>
        <Component {...componentParams[subView] || {}}/>
      </div>
  )
}

export default Components
