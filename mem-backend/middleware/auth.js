// middleware/auth.js
const jwt = require('jsonwebtoken');

// Authentication Service (Single Responsibility Principle)
class AuthService {
  static verifyToken(token) {
    if (!token) {
      throw new Error('No token provided');
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

// Error Handler (Single Responsibility Principle)
class AuthErrorHandler {
  static handle(res, error) {
    console.error('Authentication error:', error);
    
    const statusCode = error.message === 'No token provided' ? 401 : 403;
    const message = error.message === 'No token provided' 
      ? 'Authentication required' 
      : 'Invalid authentication token';
    
    return res.status(statusCode).json({ 
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
}

// Middleware Class (Open/Closed Principle)
class AuthMiddleware {
  static authenticate() {
    return async (req, res, next) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decoded = AuthService.verifyToken(token);
        
        req.user = decoded;
        next();
      } catch (error) {
        AuthErrorHandler.handle(res, error);
      }
    };
  }
}

module.exports = AuthMiddleware.authenticate();