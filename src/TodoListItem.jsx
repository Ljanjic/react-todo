import item from "./TodoList";


function TodoListItem ({ todo }) {
  return  (
    <li>
      <span>{todo.title}</span>
    </li>
        
  )
}

export default TodoListItem;