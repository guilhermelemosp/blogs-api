const { Category, PostCategory } = require('../models');

const createCategory = async (name) => {
  const categorieAlreadyCreated = await Category.create({ name });

  return { type: null, message: categorieAlreadyCreated };
};

const getAll = async () => {
  const findAll = await Category.findAll();
  return { type: 200, message: findAll };
};

const createPostCategory = async (postId, categoryId) => {
  const post = await PostCategory.create({ postId, categoryId });

  return post;
};

module.exports = { 
  createCategory,
  getAll,
  createPostCategory,
};