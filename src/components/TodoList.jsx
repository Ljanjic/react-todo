import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';
import styles from './TodoListItem.module.css';

function TodoList({ todoList, onRemoveTodo, onUpdateTodo }) {
    const handleRemoveTodo = (id) => {
        onRemoveTodo(id);
    };

    const handleUpdateTodo = (id, updatedTitle) => {
        onUpdateTodo(id, updatedTitle);
    };

    return (
        <div>
            <ul>
                {todoList.map((todo) => (
                    <li key={todo.id} className={styles.todoItem}>
                        <TodoListItem
                            todo={todo}
                            onRemoveTodo={handleRemoveTodo}
                            onUpdateTodo={handleUpdateTodo}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoList;
