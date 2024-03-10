import TodoListItem from "./TodoListItem";


function TodoList () {
  const todoList = [
    {
      id: 1,
      title: 'wake up on time',
    },
    {
      id: 2,
      title: 'bathroom routine',
    },
    {id: 3,
      title: 'prepare and eat breakfast'
    },
  ];
    return (
      <div> 
       <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            <TodoListItem todo={item} />
          </li>
        ))}
     </ul>
  </div>
  );
};





export default TodoList;