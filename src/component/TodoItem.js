import React, { useState } from "react";

function TodoItem({ editingTodo, todo, onCheckboxChange, onSingleTodoDelete, onEdit }) {
    const [editText, setEditText] = useState(todo.text);

    const handleEditClick = () => {
        onEdit(todo.id);
        setEditText(todo.text);
    };

    const handleSaveEdit = () => {
        onEdit(null);
        if (editText.trim() !== "") {
            todo.text = editText;
        }
    };

    return (
        <li className='singleTodo' >
            <input type="checkbox" className="checkBox"
                checked={todo.completed}
                onChange={() => onCheckboxChange(todo.id)}
            />
            {editingTodo === todo.id ? (
                <> <input type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)} />
                    <button onClick={handleSaveEdit}>Save</button>
                </>
            ) : (<>
                <span className={todo.completed ? "todoText completed" : "todoText"}>{todo.text}</span>
                <button onClick={handleEditClick}>Edit</button>
            </>)}
            <button onClick={() => onSingleTodoDelete(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;
