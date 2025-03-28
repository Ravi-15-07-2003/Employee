const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.protect = (roles = []) => {
  // roles can be a string or array
  if(typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({ error: 'Not authorized, token missing' });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      if(roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
