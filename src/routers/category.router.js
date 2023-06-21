const { Router } = require('express');
const { categoryController } = require('../controllers');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { categoryFieldsValidator } = require('../middlewares/categoryFieldsValidator');

const router = Router();

router.get('/', jwtValidator, categoryController.getAll);
router.post('/', jwtValidator, categoryFieldsValidator, categoryController.createCategory);

module.exports = router;