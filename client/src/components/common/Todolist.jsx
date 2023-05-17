import React, { useState } from "react";
import TodoItem from "./TodoItem.jsx";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", status: "todo" },
    { id: 2, text: "Learn styled-components", status: "done" },
    { id: 3, text: "Build a todo app", status: "todo" },
  ]);

  const onCheck = target => {
    const newTodos = todos.map(todo => {
      if (todo.id.toString() === target.id) {
        return { ...todo, status: target.checked ? "done" : "todo" };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const onEdit = (target, text) => {
    const newTodos = todos.map(todo => {
      if (todo.id.toString() === target.dataset.id) {
        return { ...todo, text: text };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} item={todo} onCheck={onCheck} onEdit={onEdit} />
      ))}
    </ul>
  );
}

export default TodoList;
