import React from 'react';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, deleteTask, editTask, toggleDone }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div 
          key={task._id}
          className={`task ${task.isDone ? 'done' : ''}`}
          aria-label={`Task: ${task.text}, due ${task.date} at ${task.time}`}
        >
          <div className="task-content">
            <h3 className="task-text">{task.text}</h3>
            <p className="task-datetime">
              Due: {task.date} at {task.time}
            </p>
          </div>
          <div className="task-actions">
            <button
              onClick={() => toggleDone(task._id, task.isDone)}
              className={`status-btn ${task.isDone ? 'done' : ''}`}
              aria-label={task.isDone ? 'Mark as undone' : 'Mark as done'}
            >
              {task.isDone ? <FaCheck /> : <FaTimes />}
            </button>
            <button
              onClick={() => editTask(task)}
              className="edit-btn"
              aria-label="Edit task"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="delete-btn"
              aria-label="Delete task"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;