const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtValidator = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const dToken = jwt.verify(token, JWT_SECRET);
    req.user = dToken;
    } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  jwtValidator,
};