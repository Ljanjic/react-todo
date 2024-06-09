import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    todoList: PropTypes.array,
};

export default InputWithLabel;
