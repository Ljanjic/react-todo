import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };
    const handleAddTodo = (event) => {
        event.preventDefault();
        if (todoTitle.trim() !== '') {
            onAddTodo(todoTitle);
            setTodoTitle('');
        }
    };
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                type='text'
                id='todoTitle'
                name='title'
                value={todoTitle}
                onChange={handleTitleChange}
                autoFocus={true}
            >
                Title:
            </InputWithLabel>
            <button type='submit'>Add</button>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
