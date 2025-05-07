import React, { useState, useEffect } from 'react';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';

const encodeUrl = ({ sortField, sortDirection, url, queryString }) => {
  let searchQuery = '';
  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",title)`;
  }

  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
};

function App() {
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

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
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, url, queryString }),
          options
        );
        if (!resp.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await resp.json();
        const fetchedTodos = data.records.map((record) => ({
          id: record.id,
          ...record.fields,
          isCompleted: record.fields.isCompleted || false,
        }));
        setTodoList(fetchedTodos);
      } catch (err) {
        console.error(err.message);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString]);

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
          },
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, url, queryString }),
        options
      );
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
      console.error('Error details:', err);
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const completeTodo = async (id) => {
    const targetTodo = todoList.find((todo) => todo.id === id);
    const payload = {
      records: [
        {
          id,
          fields: {
            title: targetTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, url, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error('Failed to complete todo');
      }
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: true } : todo
        )
      );
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updatedTodo = async (editedTodo) => {
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted || false,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, url, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error('Failed to update todo');
      }
      const { records } = await resp.json();
      const updatedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (err) {
      console.error(err.message);
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

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
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
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
