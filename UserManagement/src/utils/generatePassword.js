const crypto = require('crypto');

function generateStrongPassword(length = 12) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}<>?,.';

  const all = upper + lower + numbers + symbols;

  if (length < 8) {
    throw new Error('Password length should be at least 8 characters');
  }

  let password = '';
  password += upper[crypto.randomInt(0, upper.length)];
  password += lower[crypto.randomInt(0, lower.length)];
  password += numbers[crypto.randomInt(0, numbers.length)];
  password += symbols[crypto.randomInt(0, symbols.length)];

  for (let i = 4; i < length; i++) {
    password += all[crypto.randomInt(0, all.length)];
  }

  // Shuffle the password so the first 4 characters aren't always predictable
  return password
    .split('')
    .sort(() => 0.5 - crypto.randomInt(0, 2)) // Secure shuffle
    .join('');
}

module.exports = generateStrongPassword