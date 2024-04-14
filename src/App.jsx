import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedTodoList = localStorage.getItem('savedTodoList');
        const parsedTodoList = savedTodoList ? JSON.parse(savedTodoList) : [];
        resolve({ data: { todoList: parsedTodoList } });
      }, 2000);
    });
  };

  useEffect(() => {
    fetchData()
      .then((response) => {
        setTodoList(response.data.todoList);
        setIsLoading(false);
        return response.data;
      })
    .then(result => {
      setTodoList(result.todoList);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false);
    });
   }, []);

   useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !==id);
    setTodoList(updatedTodoList);
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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </div>
  </>
  );
};

export default App;
