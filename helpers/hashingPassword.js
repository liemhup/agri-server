const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
  const saltRounds = 5;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash password with 5 rounds of bcrypt
  const hash = await bcrypt.hash(password, salt);

  return hash;
};
