const bcrypt = require("bcryptjs");

// Set the difficulty level for encryption
const saltRounds = 10;

// plainPassword is nothing but actually user entered password
const hashGenerate = async (plainPassword) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};

const hashValidator = async (plainPassword, hashPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashPassword);
    return result;
  } catch (error) {
    res.send(error);
  }
};

module.exports.hashGenerate = hashGenerate;
module.exports.hashValidator = hashValidator;
