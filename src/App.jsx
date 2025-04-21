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
