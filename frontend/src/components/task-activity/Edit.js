import React, { useState } from "react";
import axios from "axios";

const Edit = ({ task, onTaskUpdated }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task.id}`, {
        title: editedTitle,
        description: editedDescription,
        status: editedStatus,
      });
      console.log('Task updated successfully');
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <tr>
      <td><input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} /></td>
      <td><textarea value={editedDescription} onChange={e => setEditedDescription(e.target.value)} /></td>
      <td>
        <select value={editedStatus} onChange={e => setEditedStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </td>
      <td>
        <button onClick={handleSaveEdit}>Save</button>
      </td>
    </tr>
  );
};

export default Edit;