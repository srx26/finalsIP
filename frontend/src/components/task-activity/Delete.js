import axios from "axios";
import { SERVER_URL } from "./url";

const deleteTask = async (taskId, setTasks, tasks, setPopupMessage, setShowPopup) => {
  try {
    await axios.delete(`${SERVER_URL}/api/tasks/${taskId}`);
    console.log('Task deleted successfully:', taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
    setPopupMessage("Task deleted successfully!");
    setShowPopup(true);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export default deleteTask;
