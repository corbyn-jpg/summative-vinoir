const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET environment variable is not set.');
}

// Generate JWT token helper (include role for admin checks)
function generateToken(user) {
  return jwt.sign(
    { userId: user._id, name: user.name, role: user.role || 'user' },
    JWT_SECRET,
    { expiresIn: '3d' }
  );
}

// @route   POST /api/users/register
// @desc    Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password }); // Password hashed via pre-save hook
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
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
    // Need to explicitly select password field since it's excluded by default
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/me
// @desc    Get current user profile (with wishlist populated)
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('wishlist')
      .lean();

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile (name, email, phone, address, birthday, preferences)
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, phone, birthday, address, preferences } = req.body || {};

    const update = {};
    if (typeof name === 'string') update.name = name;
    if (typeof email === 'string') update.email = email;
    if (typeof phone === 'string') update.phone = phone;
    if (typeof birthday === 'string') update.birthday = birthday;
    if (address && typeof address === 'object') update.address = address;
    if (preferences && typeof preferences === 'object') update.preferences = preferences;

    const updated = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: update },
      { new: true }
    )
      .select('-password')
      .lean();

    if (!updated) return res.status(404).json({ message: 'User not found' });

    res.json(updated);
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/users/update-password
// @desc    Update password
// @access  Private
router.patch('/update-password', auth, async (req, res) => {
  const { password } = req.body; // For emoji passwords, we just need the new password

  try {
    // Need to explicitly select password field for comparison
    const user = await User.findById(req.user.userId).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = password; // Will be hashed in pre-save hook
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
