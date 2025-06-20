const User = require('../models/User');

class UserRepository {
  async getUserById(userId) {
    return User.findById(userId);
  }

  async updateUser(userId, updateData) {
    return User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async deleteUser(userId) {
    return User.findByIdAndDelete(userId);
  }

  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }
}

module.exports = new UserRepository();