const express = require('express');
const router = express.Router();

// Mock user registration route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Simulate user creation
  res.status(201).json({ message: 'User created successfully!' });
});

module.exports = router;

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        res.status(200).json(users); // Return users with 200 OK status
    } catch (err) {
        res.status(400).json({ error: err.message }); // Fixed syntax: removed extra parentheses
    }
});

module.exports = router;