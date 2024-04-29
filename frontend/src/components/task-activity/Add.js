import React, { useState } from "react";
import axios from "axios";
import PopupNotification from "./PopupNotification";
const Add = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
      
      setShowPopup(true);

    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className='mt-5 max-w-md mx-auto text-center bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
      <div className='text-center flex flex-col p-8 my-4'>
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
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            <div className="relative bg-white rounded-lg p-8">
              <p className="text-xl font-semibold mb-4">Task added successfully!</p>
              <button onClick={() => setShowPopup(false)} className="bg-slate-600 px-4 py-2 text-white rounded-md">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
