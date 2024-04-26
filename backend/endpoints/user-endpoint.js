const { login, register } = require('../repository/user-repo');

// LOGIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    login({ username, password }, db, res);
});

// REGISTER
app.post('/api/register', async (req, res) => {
    const { email, username, password } = req.body;
    register({ email, username, password }, db, res);
});
