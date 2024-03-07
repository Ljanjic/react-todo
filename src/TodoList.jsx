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


function TodoList () {
    return (
        <div>
    <ul>
    {todoList.map( function (list) {
      return (
      <li key={list.id}>
        <span>{list.title}</span>
        </li>
      );
})}
  </ul>
  </div>
    );
};





export default TodoList;