const jwt = require('jsonwebtoken');
require('dotenv').config();

const config = process.env.SECRET;

module.exports = {
  issue(payload, expiresIn) {
    return jwt.sign(payload, config, {
      expiresIn,
    });
  },
};
