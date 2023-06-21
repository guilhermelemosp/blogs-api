const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;

  await categoryService.createCategory(name);
  const user = await categoryService.createCategory(name);

  return res.status(201).json(user.message);
};

const getAll = async (req, res) => {
  const categories = await categoryService.getAll();

  return res.status(categories.type).json(categories.message);
};

module.exports = {
  createCategory,
  getAll,
};