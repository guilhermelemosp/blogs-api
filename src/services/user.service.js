const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
    const user = await User.create({ displayName, email, password, image });
  
    return { type: null, message: user };
  };

const emailCheck = (email) => User.findOne({ where: { email } });

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { type: 200, message: users };
};

const getUserById = async (id) => {
    const findUser = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

    if (!findUser) return { type: 404, message: { message: 'User does not exist' } };

    return { type: 200, message: findUser };
  };

  const deleteUser = async (id) => {  
    await User.destroy({ where: { id } });

    return { type: 204 };
  };

module.exports = {
    createUser,
    emailCheck,
    getAll,
    getUserById,
    deleteUser,
};