import React, { useEffect, useRef } from 'react';
import styles from './TodoListItem.module.css';

const InputWithLabel = (props) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [props.todoList]);

    return (
        <>
            <label htmlFor={props.id} className={styles.label}>
                {props.children}
            </label>
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                ref={inputRef}
            />
        </>
    );
};

export default InputWithLabel;
