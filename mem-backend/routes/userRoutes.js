const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Make sure you have this middleware to verify JWT

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password }); // Password hashed via pre-save hook
    await user.save();

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/login
// @desc    Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/me
// @desc    Get current user profile (with wishlist)
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('wishlist');

    res.json(user);
  } catch (err) {
    console.error('Profile error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/users/update-password
// @desc    Update password
// @access  Private
router.patch('/update-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword; // Will be re-hashed in model pre-save hook
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password update error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
