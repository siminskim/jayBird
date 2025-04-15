import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
function App() {
  const [todoList, setTodoList] = useState([]);
  function handleAddTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
    console.log(todoList, 'Hello');
  }

    function completeTodo(id) {
      const updatedTodo = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
      setTodoList(updatedTodo)
    }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}
export default App;
