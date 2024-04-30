const express = require('express');
const router = express.Router();
const taskRepo = require('../repository/task-repo');

//GET
router.get('/tasks', (req, res) => {
    taskRepo.getTasks((err, tasks) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch tasks' });
        } else {
            res.json(tasks);
        }
    });
});

//POST
router.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description cannot be empty' });
    }

    taskRepo.addTask(title, description, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add task' });
        } else {
            res.status(201).json({ message: 'Task added successfully' });
        }
    });
});


//REMOVE
router.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    taskRepo.deleteTask(taskId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete task' });
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    });
});

//PUT
router.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description cannot be empty' });
    }

    taskRepo.updateTask(taskId, title, description, status, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update task' });
        } else {
            res.json({ message: 'Task updated successfully' });
        }
    });
});



module.exports = router;