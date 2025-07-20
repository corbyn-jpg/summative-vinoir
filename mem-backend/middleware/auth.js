const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Accommodate different casings
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Optionally, differentiate errors in logging
    if (error.name === 'TokenExpiredError') {
      console.warn('JWT expired:', error);
    } else {
      console.error('JWT verification error:', error);
    }
    res.status(401).json({ message: 'Please authenticate' });
  }
};
