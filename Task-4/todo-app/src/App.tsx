import React from 'react';
import { TodoProvider } from './context/TodoContext';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="app">
        <div className="container">
          <h1>Todo List</h1>
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App; 