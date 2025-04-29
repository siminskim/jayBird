import React, { useState, useEffect } from 'react';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';

function App() {
  //
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isSaving, setIsSaving] = useState(false)
  //
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };
      setIsSaving(true)
      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error('Failed to fetch todos');
        } //end of if

        const data = await resp.json();
        const fetchedTodos = data.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList(fetchedTodos);
      } catch (err) {
        console.log(err.message);
        setErrorMessage(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

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
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...todo, title: editedTodo.title } : todo
    );
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        isLoading={isLoading}
        onUpdateTodo={updatedTodo}
        todoList={todoList}
        onCompleteTodo={completeTodo}
      />
      {errorMessage && (
        <div className="error">
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}
export default App;
