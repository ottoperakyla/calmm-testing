import Storage from '../../utils/Storage.js'

const storage = new Storage('todolist', [])

const Todolist = ({ todos = U.atom(storage.get()), newTodo = U.atom('') }) => {  
  
  return (
      <div className="todolist space-s space-clear-rl">
        <h2>Todos</h2>
        <div className="todolist__todos space-s space-clear-rl">
        {U.map(({title, completed}) => 
          <div className="todolist__todo" key={title}>
            <input onChange={() => todos.modify(todos => toggleComplete(todos, title))} id={title} type="checkbox" {...{checked: completed}} />
            <label className="space-xs space-clear-tb" htmlFor={title}>
              {completed ? <s>{title}</s> : title}
            </label>
            <button onClick={() => todos.modify(todos => removeTodo(todos, title))}>&times;</button>
          </div>, 
          todos
        )}
        </div>
        <div className="todolist__form">
          <input onKeyDown={(e) => e.keyCode === 13 && addNewTodo(todos, newTodo)} value={newTodo} onChange={(e) => newTodo.set(e.target.value)} id="add-todo" type="text"/>
          <button onClick={() => addNewTodo(todos, newTodo)}>Add todo</button>
        </div>
      </div>
  )
}

export default Todolist

function toggleComplete(todos, title) {
  const newTodos = todos.map(todo => {
    return todo.title === title
      ? {title: todo.title, completed: !todo.completed}
      : todo
  })

  storage.set(newTodos)

  return newTodos
}

function removeTodo(todos, title) {
  const newTodos = todos.filter(todo => todo.title !== title)

  storage.set(newTodos)

  return newTodos
}

function addNewTodo(todos, newTodo) {
  todos.modify(todos => {
    const newTodos = todos.concat({title: newTodo.get(), completed: false})
    storage.set(newTodos)
    return newTodos
  })
  
  newTodo.set('')
}
