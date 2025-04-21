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

  function updatedTodo(editTodo) {
    const updatedTodos = todoList.map((todo) =>
      todo.id === editTodo.id ? { ...todo, title: editTodo.title } : todo
    );
    setTodoList(updatedTodos);
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
