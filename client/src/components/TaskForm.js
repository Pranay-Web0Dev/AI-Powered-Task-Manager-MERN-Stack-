import React from 'react';

const TaskForm = ({ task, editing, handleInputChange, handleSubmit, resetForm }) => {
  const isFormValid = task.text.trim() && task.date && task.time;

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="text"
        placeholder="Task description"
        value={task.text}
        onChange={handleInputChange}
        required
        minLength="3"
        aria-label="Task description"
      />
      <input
        type="date"
        name="date"
        value={task.date}
        onChange={handleInputChange}
        required
        aria-label="Due date"
      />
      <input
        type="time"
        name="time"
        value={task.time}
        onChange={handleInputChange}
        required
        aria-label="Due time"
      />
      <div className="form-actions">
        <button 
          type="submit"
          disabled={!isFormValid}
          className={!isFormValid ? 'disabled' : ''}
          aria-label={editing ? 'Update task' : 'Add task'}
        >
          {editing ? 'Update Task' : 'Add Task'}
        </button>
        {editing && (
          <button 
            type="button"
            onClick={resetForm}
            className="cancel-btn"
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
