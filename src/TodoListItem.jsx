import React, { useState } from 'react';

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);

    const handleUpdateTitleChange = (event) => {
        setUpdatedTitle(event.target.value);
    };

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedTitle(todo.title);
    };

    const handleSaveClick = () => {
        onUpdateTodo(todo.id, updatedTitle);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onRemoveTodo(todo.id);
    };

    return (
        <li>
            {isEditing ? (
                <div>
                    <input
                        type='text'
                        value={updatedTitle}
                        onChange={handleUpdateTitleChange}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : (
                <div>
                    <span>{todo.title}</span>
                    <button onClick={handleUpdateClick}>Update</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>
            )}
        </li>
    );
}

export default TodoListItem;
