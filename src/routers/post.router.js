const express = require('express');

const router = express.Router();

const { postController } = require('../controllers');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { postValidator } = require('../middlewares/postValidator');
const { updatePostValidator } = require('../middlewares/updatePostValidator');

router.get('/', jwtValidator, postController.getAll);
router.get('/search', jwtValidator, postController.searchPost);
router.get('/:id', jwtValidator, postController.getPostById);
router.post('/', postValidator, jwtValidator, postController.createPost);
router.put(
'/:id', 
jwtValidator,
updatePostValidator,
postController.putPost,
);
router.delete('/:id', jwtValidator, postController.deletePost);

module.exports = router;