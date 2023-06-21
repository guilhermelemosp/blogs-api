const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
const jwtConfig = {
  expiresIn: '1h',
};

const tokenGenerator = (user) => (jwt.sign(user, JWT_SECRET, jwtConfig));

const loginUser = async (email, password) => {
  const login = await User.findOne({ Where: { email, password } });

  const { dataValues } = login;

  if (!login || dataValues.email !== email || dataValues.password !== password) {
    return { 
      type: 400, message: { message: 'Invalid fields' } };
  }
  
  return { type: 200, message: { token: tokenGenerator({ email, id: dataValues.id }) } };
};

module.exports = {
  loginUser,
};