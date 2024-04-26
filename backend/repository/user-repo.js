const pool = require('./database');

// LOGIN
const login = ({ username, password }, db, res) => {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ error: 'Failed to log in' });
        }
        if (results.length > 0) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
};

// REGISTER
const register = ({ email, username, password }, db, res) => {
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';

    db.query(checkEmailQuery, [email], (err, emailResults) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ error: 'Failed to register user' });
        }

        if (emailResults.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        db.query(checkUsernameQuery, [username], (err, usernameResults) => {
            if (err) {
                console.error('Error checking username:', err);
                return res.status(500).json({ error: 'Failed to register user' });
            }

            if (usernameResults.length > 0) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
            db.query(sql, [email, username, password], (err, result) => {
                if (err) {
                    console.error('Error registering user:', err);
                    return res.status(500).json({ error: 'Failed to register user' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
};

module.exports = {
    login,
    register
};
