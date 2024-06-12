import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const TodoContainer = ({ tableName }) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            setIsLoading(true);
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${tableName}?view=Grid%20view`;

            console.log('Fetching data from URL:', url);

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
                throw new Error(`Error has occurred: ${response.status}`);
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
    }, [tableName]);

    const addTodo = async (newTodoTitle) => {
        try {
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${tableName}`;

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
                    `Error occurred while adding todo: ${response.status}`,
                );
            }

            const newTodo = await response.json();
            setTodoList((prevList) => [
                ...prevList,
                { id: newTodo.id, title: newTodo.fields.title },
            ]);
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
    };

    const removeTodo = async (id) => {
        try {
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${tableName}/${id}`;

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
                    `Error occurred while deleting todo: ${response.status}`,
                );
            }

            setTodoList((prevList) =>
                prevList.filter((todo) => todo.id !== id),
            );
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };
    const updateTodo = async (id, updatedTitle) => {
        try {
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${tableName}/${id}`;

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
                    `Error occurred while updating todo: ${response.status}`,
                );
            }

            const updatedDataResponse = await fetch(
                `https://api.airtable.com/v0/${
                    import.meta.env.VITE_AIRTABLE_BASE_ID
                }/${tableName}`,
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
            console.error('Error updating todo:', error.message);
        }
    };

    return (
        <div>
            <h1>{tableName}</h1>
            <AddTodoForm onAddTodo={addTodo} />
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
    );
};

TodoContainer.propTypes = {
    tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
