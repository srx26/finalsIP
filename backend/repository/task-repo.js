const pool = require('./database');

//ADD - Adds a new task to the database.
const addTask = (title, description, callback) => {
    const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    pool.query(sql, [title, description], (err, result) => {
        // If an error occurs during the database operation, 
        //log the error and call the callback function with the error.
        if (err) {
            console.error('Error adding task:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

//LIST - Retrieves all tasks from the database.
const getTasks = (callback) => {
    const sql = 'SELECT * FROM tasks';
    pool.query(sql, (err, results) => {
        // If an error occurs during the database operation, 
        //log the error and call the callback function with the error.
        if (err) {
            console.error('Error fetching tasks:', err);
            callback(err);
        } else {
            callback(null, results);
        }
    });
};

//DELETE - Deletes a task from the database.
const deleteTask = (taskId, callback) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    pool.query(sql, [taskId], (err, result) => {
        // If an error occurs during the database operation, 
        //log the error and call the callback function with the error.
        if (err) {
            console.error('Error deleting task:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

//EDIT - Edits a task from the database.
const updateTask = (taskId, title, description, status, callback) => {
    const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    pool.query(sql, [title, description, status, taskId], (err, result) => {
        // If an error occurs during the database operation, 
        //log the error and call the callback function with the error.
        if (err) {
            console.error('Error updating task:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

module.exports = {
    addTask,    
    getTasks,
    deleteTask,
    updateTask
};