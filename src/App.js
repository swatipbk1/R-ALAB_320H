import React, { useState } from "react";
import "./styles.css";
import initialTodoData from "./data"; // Import initial todo data from data.js

function TodoList() {
  console.log(initialTodoData);
  const [todos, setTodos] = useState(initialTodoData); // Initialize todos state with initialTodoData
  const [newTodo, setNewTodo] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  // Function to handle adding new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        {
          id: Date.now(), // Generate unique ID for each todo
          text: newTodo,
          complete: false,
          editing: false, // Default editing state is false
        },
        ...todos,
      ]);
      setNewTodo(""); // Clear input after adding todo
    }
  };

  // Function to handle toggling todo completion
  const toggleTodoCompletion = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };

  // Function to handle deleting todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to handle editing todo
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      })
    );
  };

  // Function to handle saving edited todo
  const saveTodo = (id, newText) => {
    editTodo(id, newText);
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, editing: false }; // Set editing to false after saving
        }
        return todo;
      })
    );
    setSavedMessage("Changes saved!");
    setTimeout(() => {
      setSavedMessage("");
    }, 2000); // Clear the message after 2 seconds
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => toggleTodoCompletion(todo.id)}
            />
            {todo.editing ? (
              <>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => editTodo(todo.id, e.target.value)}
                />
                <button onClick={() => saveTodo(todo.id, todo.text)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span className={todo.complete ? "completed" : ""}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  disabled={!todo.complete}
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, editing: true } : t
                      )
                    )
                  }
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {savedMessage && <div>{savedMessage}</div>}
    </div>
  );
}

export default TodoList;
