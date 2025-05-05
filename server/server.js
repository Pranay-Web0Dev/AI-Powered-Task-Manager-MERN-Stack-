require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Database Connection
// Updated MongoDB connection
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager');
      console.log('MongoDB Connected');
    } catch (err) {
      console.error('MongoDB Connection Error:', err);
      process.exit(1);
    }
  };
connectDB();

// Routes
app.get('/', (req, res) => res.send('Task Manager API'));

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  const { text, date, time } = req.body;

  if (!text || !date || !time) {
    return res.status(400).json({ message: 'Please provide text, date, and time' });
  }

  try {
    const task = new Task({
      text,
      date,
      time,
      isDone: req.body.isDone || false
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Invalid task data', error: err.message });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.text = req.body.text || task.text;
    task.date = req.body.date || task.date;
    task.time = req.body.time || task.time;
    task.isDone = req.body.isDone !== undefined ? req.body.isDone : task.isDone;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task', error: err.message });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task removed', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));