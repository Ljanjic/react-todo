import TodoListItem from "./TodoListItem";


function TodoList ({ todoList }) {
  // const todoList = [
  //   {
  //     id: 1,
  //     title: 'wake up on time',
  //   },
  //   {
  //     id: 2,
  //     title: 'bathroom routine',
  //   },
  //   {id: 3,
  //     title: 'prepare and eat breakfast'
  //   },
  // ];
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