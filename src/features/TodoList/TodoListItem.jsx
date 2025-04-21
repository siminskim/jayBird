import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  //
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  //set state value
  function handleEdit(e) {
    setWorkingTitle(e.target.value);
  }
  //resets back to empty
  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleUpdate(e) {
    e.preventDefault();
    if (!isEditing) {
      return;
    }
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
 
        {isEditing ? (
          <TextInputWithLabel
            onChange={(e) => handleEdit(e)}
            value={workingTitle}
          />
        ) : (
          //if false, display the existing form and its contents
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </li>
  );
}

export default TodoListItem;