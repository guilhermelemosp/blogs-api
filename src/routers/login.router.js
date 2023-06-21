const { Router } = require('express');
const { loginController } = require('../controllers');
const { loginValidator } = require('../middlewares/loginValidator');

const router = Router();

router.post('/', loginValidator, loginController.loginUser);

module.exports = router;