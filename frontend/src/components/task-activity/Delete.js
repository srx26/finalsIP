// import React from "react";
// import axios from "axios";

// const Delete = ({ taskId, onTaskDeleted }) => {
//   const handleDeleteTask = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
//       console.log('Task deleted successfully');
//       onTaskDeleted();
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <button onClick={handleDeleteTask}>Delete</button>
//   );
// };

// export default Delete;