const Joi = require("joi");

const userSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name must be at most 50 characters",
  }),

  middle_name: Joi.string().allow("").max(50).required().messages({
    "string.base": "Middle name must be a string",
    "string.max": "Middle name must be at most 50 characters",
  }),

  last_name: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name must be at most 50 characters",
  }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  password: Joi.string().min(8).max(128).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be at most 128 characters",
  }),
  role: Joi.string().required()
});

module.exports = userSchema;
