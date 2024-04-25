import React, { useState } from "react";
import axios from "axios";
const Add = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', { title, description });
      console.log('Task added successfully:', response.data);
      onTaskAdded(); 


      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      console.log('Tasks fetched after adding new task:', response.data);
    } catch (error) {
      console.error('Error fetching tasks after adding new task:', error);
    }
  };

  return (
    <div>
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
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default Add;
