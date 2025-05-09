import TodoListItem from './TodoListItem.jsx';
import React from 'react';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  
  return (
    <div>
      {isLoading ? (<p>Todos Loading...</p>)
       : (
        <>
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
        </>
      )}
    </div>
  );
}

export default TodoList;
