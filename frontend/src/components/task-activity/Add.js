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
      setErrorMessage("");
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div class='mt-5 max-w-md mx-auto text-center bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
      <div className = 'text-center flex flex-col p-8 my-4'>
        <h2 className="text-2xl font-bold mb-4 text-[#374357]">Add New Task</h2>
  
        <input
        className="border w-full py-2 px-3 mb-3 "
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="border w-full py-2 px-3 mb-3"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
    
       
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button className ='bg-slate-600 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white hover:bg-[#374357]' onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Add;