import item from "./TodoList";


function TodoListItem (props) {
    const { todo} = props;
  return  (
        <span>{todo.title}</span>
  )
}

export default TodoListItem;