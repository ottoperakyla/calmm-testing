import Todolist from './todo-list.jsx'
import Calendar from './calendar.jsx'
import PageNotFound from '../PageNotFound.jsx'

const subViews = {
  'todo-list': Todolist,
  'calendar': Calendar
}

const Components = ({ subView }) => {
  const Component = subViews[subView] || PageNotFound
  
  return (
      <div>
        <Component />
      </div>
  )
}

export default Components
