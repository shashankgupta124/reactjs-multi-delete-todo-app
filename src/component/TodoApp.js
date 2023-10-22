import { useState } from "react";
import TodoItem from "./TodoItem";

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim() !== "") {
            setTodos([
                { text: inputText, id: Date.now(), completed: false },
                ...todos
            ]);
            setInputText("");
        }
    };
    const handleCheckboxChange = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };
    
    const handleMultiTodoDelete = () => {
        const updatedTodos = todos.filter((todo) => !todo.completed);
        setTodos(updatedTodos);
    };

    const handleSingleTodoDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };
    const handleEditTodo = (id) => {
        setEditingTodo(id);
    };
    return (
        <>  
            <h1>Todo App</h1>
            <form onSubmit={handleSubmit} className='todoForm'> 
                <input type="text"
                    placeholder="Add a new todo"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            
            {/* Enable Multi delete if more then 1 item added */}
            {todos.length > 1 ?<div>
                <button className="multiDelete-btn"
                    onClick={handleMultiTodoDelete}>Multi Delete</button> </div>
                : ''
            }
            
            <ul  className='allTodos'>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onCheckboxChange={handleCheckboxChange}
                        onSingleTodoDelete={handleSingleTodoDelete}
                        onEdit={handleEditTodo}
                        editingTodo={editingTodo}
                    />
                ))}
            </ul>
        </>
    );
}
export default TodoApp;
