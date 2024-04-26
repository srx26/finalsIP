import React, { useState } from "react";
import axios from "axios";

const Add = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTask = async () => {
    try {
      if (!title.trim() || !description.trim()) {
        setErrorMessage("Title and description cannot be empty.");
        return; 
      }

      await axios.post('http://localhost:5000/api/tasks', { title, description });
      console.log('Task added successfully');
      onTaskAdded();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="task-container">
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default Add;