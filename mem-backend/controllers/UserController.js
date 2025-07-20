const mongoose = require('mongoose');
const User = require('../models/User');

// Optional: create a utility to filter allowed fields for update
const filterUpdateFields = (body, allowedFields = ['name']) =>
  Object.fromEntries(Object.entries(body).filter(([k]) => allowedFields.includes(k)));

class UserController {
  // GET current user profile (minus password)
  async getUser(req, res) {
    try {
      const userId = req.user.userId; // JWT payload should be { userId }
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      const user = await User.findById(userId)
        .select('-password')
        .populate('wishlist')
        .lean();
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // PATCH update user (safe fields only)
  async updateUser(req, res) {
    try {
      const userId = req.user.userId;
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Only allow selected fields to be updated
      const allowedFields = ['name']; // You can add fields here if safe
      const updateData = filterUpdateFields(req.body, allowedFields);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true, select: '-password' }
      ).lean();

      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // DELETE user
  async deleteUser(req, res) {
    try {
      const userId = req.user.userId;
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new UserController();
