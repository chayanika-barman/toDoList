import { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const addTodo = (text) => {
    const newTodo = {
      id: generateId(),
      text: text,
      completed: false
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="app">
      <div className="app-container">
        <Header 
          onAddTodo={addTodo}
          onClearAll={clearAllTodos}
          todoCount={todos.length}
        />
        
        <main>
          <ToDoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </main>
        
        <footer className="footer">
          {todos.length === 0 ? (
            <p className="footer-stats">Ready to be productive?</p>
          ) : (
            <div>
              <p className="footer-stats">
                {activeCount} of {todos.length} tasks remaining
              </p>
              {completedCount > 0 && (
                <p className="footer-completed">
                  🎉 {completedCount} completed!
                </p>
              )}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

export default App;
