const pool = require('./database');

// LOGIN
const login = ({ username, password }, db, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            callback({ status: 500, error: 'Failed to log in' });
        } else if (results.length > 0) {
            callback(null, { status: 200, message: 'Login successful' });
        } else {
            callback({ status: 401, error: 'Invalid credentials' });
        }
    });
};

// REGISTER
const register = ({ email, username, password }, db, callback) => {
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';

    db.query(checkEmailQuery, [email], (err, emailResults) => {
        if (err) {
            console.error('Error checking email:', err);
            callback({ status: 500, error: 'Failed to register user' });
        } else if (emailResults.length > 0) {
            callback({ status: 400, error: 'Email already exists' });
        } else {
            db.query(checkUsernameQuery, [username], (err, usernameResults) => {
                if (err) {
                    console.error('Error checking username:', err);
                    callback({ status: 500, error: 'Failed to register user' });
                } else if (usernameResults.length > 0) {
                    callback({ status: 400, error: 'Username already exists' });
                } else {
                    const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
                    db.query(sql, [email, username, password], (err, result) => {
                        if (err) {
                            console.error('Error registering user:', err);
                            callback({ status: 500, error: 'Failed to register user' });
                        } else {
                            callback(null, { status: 201, message: 'User registered successfully' });
                        }
                    });
                }
            });
        }
    });
};

module.exports = {
    login,
    register
};
