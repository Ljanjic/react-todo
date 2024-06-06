import React from 'react';
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

export default TodoList;
