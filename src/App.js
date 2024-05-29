import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Project planning' },
    { id: 2, text: 'Kickoff meeting' },
    { id: 3, text: 'test' },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  return (
    <div className="App">
      <div className="todo-list">
        <h2>To do</h2>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {todo.text}
          </div>
        ))}
        <div className="add-todo">
          <input 
            type="text" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
            placeholder="Add a card"
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
