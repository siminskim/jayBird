import React, { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');

  function handleAddTodo(e) {
    e.preventDefault();
    const id = Date.now();
    const title = e.target.title.value;
    onAddTodo({ title, id, isCompleted: false });
    e.target.title.value = '';
    todoTitleInput.current.focus();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle" placeholder="Enter New Todo">
        Todo
      </label>
      <input
        ref={todoTitleInput}
        name="title"
        type="text"
        id="todoTitle"
      ></input>
      <button type="submit">Add Todo</button>
    </form>
  );
}
export default TodoForm;
