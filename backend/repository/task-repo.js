const pool = require('./database');

//ADD
const addTask = (title, description, callback) => {
    const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    pool.query(sql, [title, description], (err, result) => {
        if (err) {
            console.error('Error adding task:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

//LIST
const getTasks = (callback) => {
    const sql = 'SELECT * FROM tasks';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            callback(err);
        } else {
            callback(null, results);
        }
    });
};

//DELETE
const deleteTask = (taskId, callback) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    pool.query(sql, [taskId], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

//EDIT
const updateTask = (taskId, title, description, callback) => {
    const sql = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
    pool.query(sql, [title, description, taskId], (err, result) => {
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