// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        fields: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    if (password.length < 3) {
      return res.status(400).json({ 
        message: 'Password must be at least 3 characters long' 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: 'User already exists with this email' 
      });
    }

    // Create and save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Create token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ 
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        fields: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Find user
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Compare password
    if (foundUser.password !== password) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Create token
    const token = jwt.sign(
      { userId: foundUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ 
      token,
      user: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Login failed',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId).select('-password');
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(currentUser);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Error fetching user data',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
});

// Update password
router.patch('/update-password', auth, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 3) {
      return res.status(400).json({ 
        message: 'Password must be at least 3 characters long' 
      });
    }

    const userToUpdate = await User.findById(req.user.userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToUpdate.password = password;
    await userToUpdate.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ 
      message: 'Error updating password',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
});

module.exports = router;