import TodoListItem from "./TodoListItem";


function TodoList ({ todoList }) {
    return (
      <div> 
       <ul>
        {todoList.map((item) => (
            <TodoListItem key={item.id} todo={item} />
        ))}
     </ul>
  </div>
  );
};



export default TodoList;