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
  const [isSaving, setIsSaving] = useState(false);
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





  const handleAddTodo = async (newTodo) => {
    if (!newTodo.title) {
      throw new Error('Title is required');
    }
  
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted || false,
          }
        }
      ]
    };
  
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
  
    try {
      setIsSaving(true);
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error('Failed to add todo');
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };
      setTodoList((prevTodos) => [...prevTodos, savedTodo]);
    } catch (err) {
      console.error("Error details:", err);
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };





  

  function completeTodo(id) {
    const updatedTodo = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodo);
  }//end completeTodo


const updatedTodo = async (editedTodo) => {
  setIsSaving(true)
 const payload =  {
    records: [{
      id: editedTodo.id,
        fields: {
          title: editedTodo.title
        }
      }
    ]
    }//end payload
  const options = {
    method: 'PATCH',
    headers:{
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }//end options
  try {
    const resp = await fetch(`${url}/${editedTodo.id}`, options); 
    if (!resp.ok) {
      throw new Error('Failed to update todo');
    }
    const data = await resp.json(); 
    const updatedTodo = {
      id: data.id,
      ...data.fields, 
    };
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    ); 
  } catch (err) {
    console.log(err.message);
    setErrorMessage(err.message); 
  } finally {
    setIsSaving(false); 
}
}








 

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving} />
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
