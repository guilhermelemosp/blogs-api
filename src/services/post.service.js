const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');

const createPost = async (title, content, userId, categoryIds) => {
  const published = Date.now();
  const updated = Date.now();

  const map = categoryIds.map((id) => Category.findOne({ where: { id } }));
  const result = await Promise.all(map);
  const nullCategory = result.some((item) => item === null);

  if (nullCategory) return { message: 'one or more "categoryIds" not found' };

  const newPost = await BlogPost.create({ 
    title, 
    content, 
    userId, 
    published, 
    updated });

  return newPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!posts) return { message: 'No registered posts' };
    
  return { type: 200, message: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
 return { 
    type: 404,
    message: 'Post does not exist', 
  }; 
}

  return { type: 200, message: post };
};

const putPost = async ({ id, title, content, userId }) => {
  const postUpdate = await BlogPost.findByPk(id);

  if (!postUpdate) {
    return { type: 404, message: 'Post does not exist' };
  }

  if (postUpdate.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' }; 
}

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const postUpdated = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: 200, message: postUpdated };
};

const deletePost = async ({ id, userId }) => {
  const post = await BlogPost.findByPk(id);

  if (!post) {
    return { type: 404, message: 'Post does not exist' };
  }

  if (post.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  const postDeleted = await BlogPost.destroy({ where: { id } });

  return { type: 204, message: postDeleted };
};

const searchPost = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!posts) return { message: 'No registered posts' };

  return { type: 200, message: posts };
};

module.exports = { 
  createPost,
  getAll,
  getPostById,
  putPost,
  deletePost,
  searchPost,
};