const Joi = require('joi');

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().not().empty().required(),
  }).validate({ email, password });

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = {
    loginValidator,
};