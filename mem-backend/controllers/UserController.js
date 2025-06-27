const User = require('../models/User');

class UserController {
  async getUser(req, res) {
    try {
      const userId = req.user.id; // assuming JWT payload has { id: userId }
      const user = await User.findById(userId).select('-password'); // exclude password field for security
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.user.id;
     

      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
        select: '-password',
      });

      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.user.id;
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
