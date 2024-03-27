import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div>
    <div>
      <h1>Todo List</h1>
    </div>
    <div>
      <AddTodoForm onAddTodo={addTodo} />
    </div>
    <div>
      <TodoList todoList={todoList} />
    </div>
  </div>
  );
}

export default App;
