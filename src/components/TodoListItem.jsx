import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';

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
        <div className={styles.todoItem}>
            {isEditing ? (
                <div className={styles.todoContent}>
                    <input
                        type='text'
                        value={updatedTitle}
                        onChange={handleUpdateTitleChange}
                    />
                    <div className={styles.todoButtons}>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className={styles.todoContent}>
                    <span>{todo.title}</span>
                    <div className={styles.todoButtons}>
                        <button onClick={handleUpdateClick}>Update</button>
                        <button onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
