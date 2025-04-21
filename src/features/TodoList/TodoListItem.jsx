import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  //
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleEdit(e) {
    setWorkingTitle(e.target.value);
  }

  function handleCancel() {
    console.log('clicked')
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }
  // Calls onUpdateTodo and passes an object with todo's properties, setting the title to workingTitle.

  // Sets isEditing to false.


  function handleUpdate (e) {
    e.preventDefault()
    if(!isEditing){
      return 
    }
    onUpdateTodo({...todo, title: workingTitle})
    setIsEditing(false)
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <TextInputWithLabel onChange={(e) => handleEdit(e)} value={workingTitle}  />
        ) : (
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
