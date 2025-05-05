# Task Manager MERN Stack

A simple task manager built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to add, edit, delete, and mark tasks as done or undone. It is a single-page application (SPA) and does not include user authentication.

## Tech Stack

- **MongoDB**: NoSQL database for storing tasks.
- **Express**: Web framework for Node.js for setting up the backend server and API routes.
- **React**: Frontend JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime for the backend server.
- **Axios**: For making HTTP requests between the frontend and backend.
- **CORS**: For enabling cross-origin resource sharing between frontend and backend.

## Features

- Add a new task.
- Edit an existing task.
- Delete a task.
- Mark tasks as done or undone.

## Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** (or a cloud database like MongoDB Atlas)
  
You can download Node.js from [here](https://nodejs.org/), and MongoDB from [here](https://www.mongodb.com/try/download/community) if you're running it locally.

### Steps to Run the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/task-manager-mern-stack.git
   cd task-manager-mern-stack
Install the  Dependencies:

cd backend
npm install

cd ../client
npm install


Set Up MongoDB Database:

If you are using MongoDB locally, make sure MongoDB is running on your machine. By default, it will run on mongodb://localhost:27017.

If you're using MongoDB Atlas, you'll need to update the MongoDB URI in the backend .env file with your database URI.

MONGO_URI=mongodb://localhost:27017/task-manager
PORT=5000

cd ..
npm start


Usage
Once the app is running, you can:

Add a task by entering text in the input field and clicking the "Add Task" button.

Edit a task by clicking on the "Edit" button next to the task.

Delete a task by clicking on the "Delete" button next to the task.

Mark a task as done or undone by clicking on the "Done/Undone" button.

Project Structure
/task-manager-mern-stack
├── /backend            # Backend server and API
│   ├── /models         # MongoDB models
│   ├── /routes         # Express routes for task management
│   └── server.js       # Server setup
│
├── /client             # Frontend React app
│   ├── /public         # Public assets (e.g., index.html)
│   ├── /src            # React components and logic
│   ├── App.js          # Main App component
│   └── index.js        # Entry point for React app
│
└── .env                # MongoDB URI and port for backend
