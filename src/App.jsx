import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            setIsLoading(true);
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${import.meta.env.VITE_TABLE_NAME}`;

            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${
                        import.meta.env.VITE_AIRTABLE_API_TOKEN
                    }`,
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error has occured: ${response.status}`);
            }

            const data = await response.json();

            const todos = data.records.map((record) => ({
                id: record.id,
                title: record.fields.title,
            }));

            setTodoList(todos);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
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
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
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
                                    <TodoList
                                        todoList={todoList}
                                        onRemoveTodo={removeTodo}
                                    />
                                )}
                            </div>
                        </>
                    }
                />
                <Route
                    path='/new'
                    element={
                        <>
                            <h1>New Todo List</h1>
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
