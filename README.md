# Installation instructions
Follow these steps to install and set up the React application on your local machine.

## Prerequisites
Ensure you have installed:
- Node.js You can download from [https://nodejs.org][] 
- npm (comes with Node.js)


import React, { useState } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
// import propTypes from 'prop-types'
//!import propTypes from 'prop-types
function App() {
  //
  const [todoList, setTodoList] = useState([]);
  //
  function handleAddTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodo = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodo);
  }

  function updatedTodo (editTodo) {
    todoList.map((todo) => {
      if(todo.id === editTodo.id) {
        // if it matches - return a new object that destructures the editedTodo
        return { ...todo, title: editTodo.title };
      }else{
        // if not a match - return the current todo.
        return todo
      }
    })
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList onUpdateTodo={updatedTodo} todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}
export default App;
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
import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return (
    <div>
      {filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
export default TodoList;
