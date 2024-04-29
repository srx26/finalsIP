import React, { useState, useEffect } from "react";
import axios from "axios";
import Add from "./Add";
import List from "./List";
import PopupNotification from "./PopupNotification"; 
import "./styles.css";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      console.log('Task deleted successfully:', taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      setPopupMessage("Task deleted successfully!");
      setShowPopup(true);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (taskId, title, description) => {
    setTaskToUpdate({ id: taskId, title, description });
  };

  const handleSaveEdit = async (editedTask) => {
    try {
      if (!editedTask.title.trim() || !editedTask.description.trim()) {
        setPopupMessage("Title and description cannot be empty.");
        setShowPopup(true);
        return;
      }

      await axios.put(`http://localhost:5000/api/tasks/${editedTask.id}`, {
        title: editedTask.title,
        description: editedTask.description
      });
      console.log('Task updated successfully:', editedTask.id);
      fetchTasks();
      setTaskToUpdate(null);
      setPopupMessage("Task updated successfully!");
      setShowPopup(true);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancelEdit = () => {
    setTaskToUpdate(null);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <div>
      <Add onTaskAdded={fetchTasks} />
      <List tasks={tasks} taskToUpdate={taskToUpdate} onEditTask={handleEditTask} onSaveEdit={handleSaveEdit} onCancelEdit={handleCancelEdit} onDeleteTask={handleDeleteTask} />
      {showPopup && <PopupNotification message={popupMessage} onClose={handlePopupClose} />}
    </div>
  );
};

export default Main;