const { loginService } = require('../services');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const createdLogin = await loginService.loginUser(email, password);

    res.status(createdLogin.type).json(createdLogin.message);
};

module.exports = { 
  loginUser,
};