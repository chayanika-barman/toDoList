import { useState } from 'react';

const Header = ({ onAddTodo, onClearAll, todoCount }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <header className="header">
      <h1 className="app-title">My Todo App</h1>
      <p className="app-subtitle">Stay organized and get things done!</p>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>
      
      {todoCount > 0 && (
        <button onClick={onClearAll} className="clear-btn">
          Clear All ({todoCount})
        </button>
      )}
    </header>
  );
};

export default Header; 