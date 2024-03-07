import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

function App() {

  return (
    <div>
  <h1>Todo List</h1>
  < AddTodoForm />
  < TodoList />
  </div>
  );
}

export default App;
