const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = (req, res, next) => {
  // Get token from header
  // const token = req.header('x-auth-token');
  const authHeader = req.header('Authorization');
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1]
  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;