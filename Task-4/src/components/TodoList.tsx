import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos } = useTodo();

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="no-todos">No todos yet. Add one above!</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList; 