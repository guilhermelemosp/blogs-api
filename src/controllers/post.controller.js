const { postService, categoryService } = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const createdPost = await postService.createPost(title, content, id, categoryIds);

  if (createdPost.message) {
    return res.status(400).json({ message: createdPost.message });
  }

  const map = categoryIds.map((cId) => categoryService
  .createPostCategory(createdPost.dataValues.id, cId));

  await Promise.all(map);

  return res.status(201).json(createdPost.dataValues);
};

const getAll = async (req, res) => {
  const { type, message } = await postService.getAll();

  return res.status(type).json(message);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getPostById(id); 

  return res.status(type).json(message);
};

const putPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;

  const { type, message } = await postService.putPost({ id, title, content, userId });

  return res.status(type).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const { type, message } = await postService.deletePost({ id, userId });

  return res.status(type).json(message);
};

const searchPost = async (req, res) => {
  const { q: searchTerm } = req.query;

  const { type, message } = await postService.searchPost(searchTerm);

  return res.status(type).json(message);
};

module.exports = { 
  createPost,
  getAll,
  getPostById,
  putPost,
  deletePost,
  searchPost,
};