const bcrypt = require("bcrypt");

function hashPassword(text, salt = 10) {
  return bcrypt.hashSync(text, salt);
}

function comparePassword(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

module.exports = { hashPassword, comparePassword };
