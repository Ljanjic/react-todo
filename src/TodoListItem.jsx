import item from './TodoList';
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onRemoveTodo }) {
    const RemoveButton = () => {
        onRemoveTodo(todo.id);
    };
    return (
        <li className={styles.ListItem}>
            <span>{todo.title}</span>
            <button type='button' onClick={RemoveButton}>
                Remove
            </button>
        </li>
    );
}

export default TodoListItem;
