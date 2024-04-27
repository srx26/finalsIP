import React, { useState } from "react";

const List = ({ tasks, taskToUpdate, onEditTask, onSaveEdit, onCancelEdit, onDeleteTask }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; 

  const handleSaveEdit = () => {
    if (!taskToUpdate.title.trim() || !taskToUpdate.description.trim()) {
      setErrorMessage("Title and description cannot be empty.");
      return;
    }

    setErrorMessage("");
    onSaveEdit(taskToUpdate);
  };

 
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);


  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="w-full px-16 mt-10">
      <div className="mx-auto rounded-xl text-center flex flex-col p-8 my-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full">
            <thead className="border-b border-gray">
              <tr className="mb-4">
                <th className="w-1/3">Title</th>
                <th className="w-1/3">Description</th>
                <th className="w-1/3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map(task => (
                <tr key={task.id} className="border-b border-gray">
                  <td className="w-1/3">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                    <input 
                      type="text" 
                      value={taskToUpdate.title} 
                      onChange={e => 
                        onEditTask(task.id, e.target.value, taskToUpdate.description)
                      } 
                      className=" bg-gray-100 text-center py-2"  /> 
                    ) : ( 
                      task.title
                    )}
                  </td>

                  <td className="w-1/3 whitespace-normal break-words text-justify">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                      <textarea
                        value={taskToUpdate.description}
                        onChange={e =>
                          onEditTask(task.id, taskToUpdate.title, e.target.value)
                        }
                        className=" bg-gray-100 text-justify py-2"
                      />
                    ) : (
                      task.description
                    )}
                  </td>

                  <td className="w-1/3">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                      <>
                        <button className="bg-slate-600 w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#374357]" onClick={handleSaveEdit}>Save</button>
                        <button className="bg-[#636972] w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#4c5057]" onClick={onCancelEdit}>Cancel</button>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                      </>
                    ) : (
                      <>
                        <button className="bg-slate-600 w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#374357]"   onClick={() => onEditTask(task.id, task.title, task.description)}>Edit</button>
                        <button className="bg-[#FF4D4D] w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#b93737d5]" onClick={() => onDeleteTask(task.id)}>Delete</button>  
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 bg-gray-300 px-3 py-1 rounded-lg hover:bg-[#9ba2af] ">Previous</button>
          <button onClick={nextPage} disabled={indexOfLastTask >= tasks.length} className="bg-gray-300 px-3 py-1 rounded-lg hover:bg-[#9ba2af]">Next</button>
        </div>
      </div>
    </div>
  );
};

export default List;