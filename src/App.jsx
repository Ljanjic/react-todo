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
  <h1>Todo List</h1>
  < AddTodoForm onAddTodo={addTodo} />
  < TodoList todoList={todoList} />
  </div>
  );
}

export default App;
