const express = require('express');
const router = express.Router();
const { login, register } = require('../repository/user-repo');
const db = require('../repository/database');

// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    login({ username, password }, db, (err, result) => {
        if (err) {
            res.status(err.status).json({ error: err.error });
        } else {
            res.status(result.status).json({ message: result.message });
        }
    });
});

// REGISTER
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    register({ email, username, password }, db, (err, result) => {
        if (err) {
            res.status(err.status).json({ error: err.error });
        } else {
            res.status(result.status).json({ message: result.message });
        }
    });
});

module.exports = router;
