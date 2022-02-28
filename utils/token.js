const jwt = require("jsonwebtoken");

// Generate the JSON web token
const tokenGenerator = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_KEY, {
    expiresIn: "3hours",
  });
  return token;
};

const tokenValidator = (token) => {
  try {
    const status = jwt.verify(token, process.env.JWT_KEY);
    return status;
  } catch (error) {
    return false;
  }
};

module.exports.tokenGenerator = tokenGenerator;
module.exports.tokenValidator = tokenValidator;
