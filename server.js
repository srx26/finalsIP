const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasks'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

//REGISTRATION
app.post('/api/register', async(req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

//LOGIN

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Failed to log in' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});


app.get('/api/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
  db.query(sql, [title, description], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      res.status(500).json({ error: 'Failed to add task' });
    } else {
      res.status(201).json({ message: 'Task added successfully' });
    }
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  const sql = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
  db.query(sql, [title, description, taskId], (err, result) => {
    if (err) {  
      console.error('Error updating task:', err);
      res.status(500).json({ error: 'Failed to update task' });
    } else {
      res.json({ message: 'Task updated successfully' });
    }
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Failed to delete task' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
