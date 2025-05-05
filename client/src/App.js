import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [task, setTask] = useState({
    text: '',
    date: '',
    time: '',
    isDone: false
  });
  const [editing, setEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const API_URL = 'http://localhost:5000/api/tasks';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_URL);
        setTasks(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setTask({ text: '', date: '', time: '', isDone: false });
    setEditing(false);
    setCurrentTaskId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editing) {
        await axios.put(`${API_URL}/${currentTaskId}`, task);
      } else {
        await axios.post(API_URL, task);
      }
      const { data } = await axios.get(API_URL);
      setTasks(data);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const editTask = (task) => {
    setTask({
      text: task.text,
      date: task.date,
      time: task.time,
      isDone: task.isDone
    });
    setEditing(true);
    setCurrentTaskId(task._id);
  };

  const toggleDone = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { isDone: !currentStatus });
      setTasks(prev => prev.map(task => 
        task._id === id ? { ...task, isDone: !currentStatus } : task
      ));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <TaskForm
          task={task}
          editing={editing}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleDone={toggleDone}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;