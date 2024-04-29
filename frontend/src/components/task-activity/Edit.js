import React, { useState } from "react";
import axios from "axios";

const Edit = ({ task, onTaskUpdated }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task.id}`, {
        title: editedTitle,
        description: editedDescription
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
        <button onClick={handleSaveEdit}>Save</button>
      </td>
    </tr>
  );
};

export default Edit;