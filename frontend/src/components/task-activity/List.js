import React, { useState } from "react";

const List = ({ tasks, taskToUpdate, onEditTask, onSaveEdit, onCancelEdit, onDeleteTask }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveEdit = () => {
    if (!taskToUpdate.title.trim() || !taskToUpdate.description.trim()) {
      setErrorMessage("Title and description cannot be empty.");
      return;
    }

    setErrorMessage("");
    onSaveEdit(taskToUpdate);
  };

  return (
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
              <td>{taskToUpdate && taskToUpdate.id === task.id ? <input type="text" value={taskToUpdate.title} onChange={e => onEditTask(task.id, e.target.value, taskToUpdate.description)} /> : task.title}</td>
              <td>{taskToUpdate && taskToUpdate.id === task.id ? <textarea value={taskToUpdate.description} onChange={e => onEditTask(task.id, taskToUpdate.title, e.target.value)} /> : task.description}</td>
              <td>
                {taskToUpdate && taskToUpdate.id === task.id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={onCancelEdit}>Cancel</button>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                  </>
                ) : (
                  <>
                    <button onClick={() => onEditTask(task.id, task.title, task.description)}>Edit</button>
                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
