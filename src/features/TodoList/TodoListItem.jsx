import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  //
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
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
            elementId={`editTodo${todo.id}`}
            onChange={(e) => handleEdit(e)}
            value={workingTitle}
            labelText="Edit Todo"
          />
        ) : (
          //if false, display the existing form and its contents
          <>
            <label htmlFor={`checkbox${todo.id}`} >
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
        {isEditing && (
          <>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>Update</button> 
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
