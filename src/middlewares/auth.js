const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const auth = (req, res, next) => {
  // Get token from header
  // const token = req.header('x-auth-token');
  const token = req.header('Authorization');
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
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;