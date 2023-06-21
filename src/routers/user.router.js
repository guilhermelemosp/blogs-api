const { Router } = require('express');
const { userController } = require('../controllers');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { userValidator } = require('../middlewares/uservalidator');

const router = Router();

router.get('/', jwtValidator, userController.getAll);
router.get('/:id', jwtValidator, userController.getUserById);
router.post('/', userValidator, userController.createUser);
router.delete('/me', jwtValidator, userController.deleteUser);

module.exports = router;