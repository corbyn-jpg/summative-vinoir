// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Support different casing due to proxies, etc.
    const authHeader = req.headers.authorization || req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not set in environment!');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    // May throw
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.warn('JWT expired:', error);
      // Send specific message so frontend can respond ("Please log in again")
      return res.status(401).json({ message: 'jwt expired' });
    }
    console.error('JWT verification error:', error);
    res.status(401).json({ message: 'Please authenticate' });
  }
};
