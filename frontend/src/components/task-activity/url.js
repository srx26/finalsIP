export const SERVER_URL = process.env.hasOwnProperty(`REACT_APP_SERVER_URL`) ? process.env.REACT_APP_SERVER_URL : 'http://localhost:5000'
export const TASK_API_URL = `${SERVER_URL}/api/tasks`