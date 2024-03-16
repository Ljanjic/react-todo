import item from "./TodoList";


function TodoListItem ({todo}) {
  return  (
    <li key={todo.id}>
      <span>{todo.title}</span>
    </li>
        
  )
}

export default TodoListItem;