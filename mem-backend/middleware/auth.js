const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required. Please log in.' 
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user and check if token is still valid
    const user = await User.findOne({ 
      _id: decoded.userId,
      // You could add token version checking here if implementing token invalidation
    });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found. Please authenticate again.' 
      });
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    let message = 'Please authenticate';
    if (error.name === 'TokenExpiredError') {
      message = 'Session expired. Please log in again.';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Invalid token. Please authenticate.';
    }

    res.status(401).json({ 
      success: false,
      message 
    });
  }
};