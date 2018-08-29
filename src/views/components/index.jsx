import Todolist from './todo-list.jsx'
import Calendar from './calendar.jsx'
import CountDown from './count-down.jsx'
import PageNotFound from '../PageNotFound.jsx'

const subViews = {
  'todo-list': Todolist,
  'calendar': Calendar,
  'count-down': CountDown
}

const componentParams = {
  'count-down': {
    timeTo: U.atom(+new Date() + 27905000)
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
