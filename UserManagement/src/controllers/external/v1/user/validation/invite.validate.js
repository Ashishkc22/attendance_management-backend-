const Joi = require('joi');

const userSchema = Joi.object({
  first_name: Joi.string().required(),
  middle_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  shift: Joi.string().optional().allow(null), // optional or nullable
  departmentId: Joi.string().required(),
  role: Joi.string().valid('STUDENT', 'TEACHER').required(), // default handled by DB
});

module.exports = userSchema