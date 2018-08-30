import Storage from '../../utils/Storage.js'

const defaultTodos = [
  {title: 'buy beer', completed: true},
  {title: 'eat food', completed: false},
  {title: 'code something', completed: false}
]
const storage = new Storage('todolist', defaultTodos)
const Todolist = ({ todos = U.atom(storage.get()), newTodo = U.atom('') }) => {  
  return (
      <div className="todolist space-s space-clear-rl">
        <h2>Todos</h2>
        <div className="todolist__todos space-s space-clear-rl">
        {U.ift(U.propEq('length', 0, U.defaultTo([], todos)), 
          <div>All done!</div>
        )}
        {U.set(storage, U.defaultTo([], todos))}
        {U.set(newTodo, todos.map(() => ''))}
        {U.mapIndexed(({title, completed}, idx) => 
          <div className="todolist__todo" key={idx}>
            <input onChange={() => todos.view([idx, 'completed']).modify(R.not)} type="checkbox" checked={completed} id={title} />
            <label className="space-xs space-clear-tb" htmlFor={title}>
              {completed ? <s>{title}</s> : title}
            </label>
            <button onClick={() => todos.view([idx]).remove()}>&times;</button>
          </div>, 
          U.defaultTo([], todos)
        )}
        </div>
        <div className="todolist__form">
          <form onSubmit={() => {
            const title = newTodo.get().trim()
            if (title) todos.modify(R.append({title, completed: false}))
          }}>
            <input value={newTodo} onChange={(e) => newTodo.set(e.target.value)} type="text"/>
            <button>Add todo</button>
          </form>
        </div>
      </div>
  )
}

export default Todolist
