const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Accept Authorization header in any casing
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

    // Verify token. May throw TokenExpiredError or JsonWebTokenError
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload to request object
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.warn('JWT expired:', error);
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    if (error.name === 'JsonWebTokenError') {
      console.warn('JWT invalid:', error);
      return res.status(401).json({ message: 'Invalid token, please log in again' });
    }

    console.error('JWT verification error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};
