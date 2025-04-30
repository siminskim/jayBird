import React, { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodo, setWorkingTodo] = useState('');
  const todoTitleInput = useRef(null);
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
      <TextInputWithLabel
        onChange={(e) => setWorkingTodo(e.target.value)}
        value={workingTodo}
        elementId={"todoTitle"}
        labelText="Todo"
        ref={todoTitleInput}
      />
      <button disabled={!workingTodo} type="submit">
        
        {isSaving ? 'Saving': 'Add Todo'}
      </button>
    </form>
  );
}
export default TodoForm;
