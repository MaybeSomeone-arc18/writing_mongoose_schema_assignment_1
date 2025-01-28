const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const User = require('./schema'); // Import the User schema

const app = express();
const port = 3010;

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.static('static'));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/userManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API Endpoint: Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password, roles, profile } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password, // In production, hash the password before saving
      roles: roles || ['user'],
      profile,
    });

    await newUser.save(); // Save the user to the database
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// API Endpoint: Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
