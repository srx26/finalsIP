const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const taskEndpoints = require('./endpoints/task-endpoint');
const userEndpoints = require('./endpoints/user-endpoint'); 
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = require('./repository/database');

app.use('/api', taskEndpoints);

app.use('/api', userEndpoints);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});