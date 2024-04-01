import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

function App() {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')));

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
    <div>
      <h1>Todo List</h1>
    </div>
    <div>
      <AddTodoForm onAddTodo={addTodo} />
    </div>
    <div>
      <TodoList todoList={todoList} />
    </div>
  </>
  );
}

export default App;
