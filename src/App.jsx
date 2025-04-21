import React, { useState } from 'react';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';

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

  function updatedTodo(editedTodo) {
   const updatedTodos = todoList.map((todo) => todo.id === editedTodo.id ? {...todo, title: editedTodo.title } : todo)
   setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        onUpdateTodo={updatedTodo}
        todoList={todoList}
        onCompleteTodo={completeTodo}
      />
    </div>
  );
}
export default App;
