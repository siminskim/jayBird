import React, { useRef, useState } from 'react';

function TodoForm({ onAddTodo }) {

  const todoTitleInput = useRef('');
  const [workingTodo, setWorkingTodo] = useState('');
  //
  function handleAddTodo(e) {
    e.preventDefault();
    const id = Date.now();
    onAddTodo({ title: workingTodo, id, isCompleted: false });
    setWorkingTodo('');
    todoTitleInput.current.focus();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle" >
        Todo
      </label>
      <input
        onChange={(e) => setWorkingTodo(e.target.value)}
        value={workingTodo}
        ref={todoTitleInput}
        name="title"
        type="text"
        id="todoTitle"
        placeholder="Enter New Todo Here"
      ></input>
      <button disabled={!workingTodo} type="submit">Add Todo</button>
    </form>
  );
}
export default TodoForm;
