import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { editTodo, deleteTodo, toggleTodo } = useTodo();

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <button onClick={handleEdit} className="save-button">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="edit-button">
          Edit
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 