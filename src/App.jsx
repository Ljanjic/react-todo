import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './TodoList'
import AddTodoForm from './TodoList'


const todoList = [
  {
    id: 1,
    title: 'wake up at 9am',
  },
  {
    id: 2,
    title: 'bathroom routine',
  },
  {id: 3,
    title: 'prepare and have breakfast'
  },
];

function App() {

  return (
    <div>
  <h1>Todo List</h1>
  < AddTodoForm />
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
}

export default App;
