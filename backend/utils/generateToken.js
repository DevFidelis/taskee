// import JWT library
const jwt = require('jsonwebtoken');

// Generate a JSON Web Token (JWT) for user authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
