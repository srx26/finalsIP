import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', { title, description });
      console.log('Task added successfully:', response.data);

      setTitle('');
      setDescription('');
      // Refresh the tasks after adding a new one
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      console.log('Task deleted successfully:', taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (taskId, title, description) => {
    setEditingTaskId(taskId);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, {
        title: editedTitle,
        description: editedDescription
      });
      console.log('Task updated successfully:', editingTaskId);
      setEditingTaskId(null);
      setTasks(tasks.map(task =>
        task.id === editingTaskId ? { ...task, title: editedTitle, description: editedDescription } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <div className="task-container">
        <h2>Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{editingTaskId === task.id ? <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} /> : task.title}</td>
                <td>{editingTaskId === task.id ? <textarea value={editedDescription} onChange={e => setEditedDescription(e.target.value)} /> : task.description}</td>
                <td>
                  {editingTaskId === task.id ? (
                    <>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditTask(task.id, task.title, task.description)}>Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
