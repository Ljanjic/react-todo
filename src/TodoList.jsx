import TodoListItem from './TodoListItem';

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
                    <li key={todo.id}>
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
