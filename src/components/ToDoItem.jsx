import { useState } from 'react';

const ToDoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      if (editValue.trim() && editValue.trim() !== todo.text) {
        onEdit(todo.id, editValue.trim());
      }
      setIsEditing(false);
    } else {
      setEditValue(todo.text);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.text}
        </span>
      )}
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="btn btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-cancel">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              disabled={todo.completed}
              className={`btn btn-edit ${todo.completed ? 'disabled' : ''}`}
            >
              Edit
            </button>
            <button onClick={() => onDelete(todo.id)} className="btn btn-delete">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoItem; 