import express from 'express';
import connectDB from './src/config/db.js';
import dotenv  from "dotenv";
import restRouter from './src/route/index.js'
import passport from 'passport';
import {configJWTStrategy} from './src/middlewares/passport-jwt.js'
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require("./src/config/swagger.json")

// import swaggerDocument from "./src/config/swagger.json";

dotenv.config();
const PORT = process.env.PORT;

connectDB();

const app = express();
app.use(express.json({ extended: false}));

app.use(passport.initialize()); // req.user
configJWTStrategy();
app.use('/api/etz',restRouter);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
    })
  );


app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));