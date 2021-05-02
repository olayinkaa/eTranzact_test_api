import jwt from 'jsonwebtoken';
import dotenv  from "dotenv";

dotenv.config();

const config = process.env.SECRET;
export default {
  issue(payload, expiresIn) {
    return jwt.sign(payload, config, {
      expiresIn,
    });
  },
};
