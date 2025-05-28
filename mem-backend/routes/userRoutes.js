// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// User Service Class (Single Responsibility Principle)
class UserService {
  constructor(UserModel) {
    this.User = UserModel;
  }

  async registerUser(userData) {
    const { name, email, password } = userData;

    // Validation
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    if (password.length < 3) {
      throw new Error('Password must be at least 3 characters long');
    }

    // Check if user exists
    const existingUser = await this.User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create and save new user
    const newUser = new this.User({ name, email, password });
    await newUser.save();
    return newUser;
  }

  async loginUser(email, password) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await this.User.findOne({ email });
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    return user;
  }

  async getCurrentUser(userId) {
    const user = await this.User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUserPassword(userId, newPassword) {
    if (!newPassword || newPassword.length < 3) {
      throw new Error('Password must be at least 3 characters long');
    }

    const user = await this.User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;
    await user.save();
    return user;
  }
}

// Auth Service Class (Single Responsibility Principle)
class AuthService {
  static generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }
}

// Response Handler (Single Responsibility Principle)
class ResponseHandler {
  static success(res, data, statusCode = 200) {
    res.status(statusCode).json({
      success: true,
      ...data
    });
  }

  static error(res, message, statusCode = 500, error = null) {
    const response = {
      success: false,
      message
    };

    if (error && process.env.NODE_ENV === 'development') {
      response.error = error.message;
      response.stack = error.stack;
    }

    res.status(statusCode).json(response);
  }
}

// Dependency Injection
const User = require('../models/User');
const userService = new UserService(User);

// Register Route
router.post('/register', async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    const token = AuthService.generateToken(newUser._id);
    
    ResponseHandler.success(res, {
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    }, 201);
  } catch (error) {
    ResponseHandler.error(res, error.message, 
      error.message.includes('exists') ? 409 : 400, 
      error);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    const token = AuthService.generateToken(user._id);
    
    ResponseHandler.success(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    ResponseHandler.error(res, error.message, 401, error);
  }
});

// Get Current User Route
router.get('/me', auth, async (req, res) => {
  try {
    const user = await userService.getCurrentUser(req.user.userId);
    ResponseHandler.success(res, { user });
  } catch (error) {
    ResponseHandler.error(res, error.message, 404, error);
  }
});

// Update Password Route
router.patch('/update-password', auth, async (req, res) => {
  try {
    await userService.updateUserPassword(req.user.userId, req.body.password);
    ResponseHandler.success(res, { message: 'Password updated successfully' });
  } catch (error) {
    ResponseHandler.error(res, error.message, 400, error);
  }
});

module.exports = router;