const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const { JWT_SECRET } = process.env;
const jwtConfig = {
  expiresIn: '1h',
};

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const user = await userService.emailCheck(email);

    if (user) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const userCreated = await userService.createUser(displayName, email, password, image);

    const token = jwt.sign({ payload: { userCreated } }, JWT_SECRET, jwtConfig);

    return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const getAllUsers = await userService.getAll();

  return res.status(getAllUsers.type).json(getAllUsers.message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  return res.status(user.type).json(user.message);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const { type, message } = await userService.deleteUser(id);

  return res.status(type).json(message);
};

module.exports = { 
  createUser,
  getAll,
  getUserById,
  deleteUser,
};