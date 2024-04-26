const express = require('express');
const router = express.Router();
const { login, register } = require('../repository/user-repo');
const db = require('../repository/database');
// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    login({ username, password }, db, res);
});

// REGISTER
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    register({ email, username, password }, db, res);
});

module.exports = router;
