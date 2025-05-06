const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// File paths for storing data
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const POSTS_FILE = path.join(__dirname, 'data', 'posts.json');

// Helper functions for reading and writing JSON files
function readJSONFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSONFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Routes
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    const users = readJSONFile(USERS_FILE);

    if (users.some(user => user.username === username)) {
        return res.status(400).send('Username already exists.');
    }

    users.push({ username, password });
    writeJSONFile(USERS_FILE, users);

    res.status(200).send('Signup successful!');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readJSONFile(USERS_FILE);

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).send('Invalid username or password.');
    }

    res.status(200).send('Login successful!');
});

app.post('/post', (req, res) => {
    const { username, content } = req.body;
    if (!username || !content) {
        return res.status(400).send('Username and content are required.');
    }

    const posts = readJSONFile(POSTS_FILE);
    const newPost = {
        username,
        content,
        date: new Date().toISOString()
    };

    posts.push(newPost);
    writeJSONFile(POSTS_FILE, posts);

    res.status(200).send('Post created successfully!');
});

app.get('/posts', (req, res) => {
    const posts = readJSONFile(POSTS_FILE);
    res.status(200).json(posts);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
