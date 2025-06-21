const User = require('../models/User');

class UserController {
  async getUser(req, res) {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user.userId);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new UserController();