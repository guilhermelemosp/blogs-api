const Joi = require('joi');

const categoryFieldsValidator = (req, res, next) => {
  const { name } = req.body;

  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
  }).validate({ name });

  if (error) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
};

module.exports = {
  categoryFieldsValidator,
};