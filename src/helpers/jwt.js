const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

const config = process.env.SECRET;

module.exports = {
  issue(payload, expiresIn) {
    return jwt.sign(payload, config, {
      expiresIn,
    });
  },
};
