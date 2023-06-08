const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Update with your secret key

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
