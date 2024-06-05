import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
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

    //
    const addTodo = async (newTodoTitle) => {
        try {
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${import.meta.env.VITE_TABLE_NAME}`;

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${
                        import.meta.env.VITE_AIRTABLE_API_TOKEN
                    }`,
                },
                body: JSON.stringify({
                    fields: {
                        title: newTodoTitle,
                    },
                }),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Error occur while adding todo: ${response.status}`,
                );
            }

            const newTodo = await response.json();
            setTodoList([
                ...todoList,
                { id: newTodo.id, title: newTodo.fields.title },
            ]);
        } catch (error) {
            console.error('Error with adding todo:', error.message);
        }
    };

    //
    const removeTodo = async (id) => {
        try {
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${
                        import.meta.env.VITE_AIRTABLE_API_TOKEN
                    }`,
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Error occur while deleting todo: ${response.status}`,
                );
            }

            const updatedTodoList = todoList.filter((todo) => todo.id !== id);
            setTodoList(updatedTodoList);
        } catch (error) {
            console.error('Error with deleting todo:', error.message);
        }
    };

    const updateTodo = async (id, updatedTitle) => {
        try {
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${
                        import.meta.env.VITE_AIRTABLE_API_TOKEN
                    }`,
                },
                body: JSON.stringify({
                    fields: {
                        title: updatedTitle,
                    },
                }),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Error occur while updating todo: ${response.status}`,
                );
            }

            const updatedDataResponse = await fetch(
                `https://api.airtable.com/v0/${
                    import.meta.env.VITE_AIRTABLE_BASE_ID
                }/${import.meta.env.VITE_TABLE_NAME}`,
                {
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_AIRTABLE_API_TOKEN
                        }`,
                    },
                },
            );
            if (!updatedDataResponse.ok) {
                throw new Error(
                    `Error fetching updated data: ${updatedDataResponse.status}`,
                );
            }

            const updatedData = await updatedDataResponse.json();
            const updatedTodos = updatedData.records.map((record) => ({
                id: record.id,
                title: record.fields.title,
            }));

            setTodoList(updatedTodos);
        } catch (error) {
            console.error('Error with updating todo:', error.message);
        }
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
                                        onUpdateTodo={updateTodo}
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
