const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a task description'],
    trim: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  date: {
    type: String,
    required: [true, 'Please add a date'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Please use YYYY-MM-DD format']
  },
  time: {
    type: String,
    required: [true, 'Please add a time'],
    match: [/^\d{2}:\d{2}$/, 'Please use HH:MM format']
  },
  isDone: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 30 // 30 hours in seconds
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Task', TaskSchema);