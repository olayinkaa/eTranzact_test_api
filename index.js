const express = require('express');
const connectDB = require('./src/config/db.js');
const dotenv = require("dotenv");
const restRouter = require('./src/route/index.js');
const winston = require('winston')
const passport = require('passport');
const {configJWTStrategy} = require('./src/middlewares/passport-jwt.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./src/config/swagger3.json");
const serverError = require('./src/middlewares/error')
const logger = require('morgan');
var cors = require('cors')
dotenv.config();
const PORT = process.env.PORT;

connectDB();

const app = express();
app.use(express.json({ extended: false}));
app.use(cors());

require('./prod')(app);

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(passport.initialize()); // req.user
configJWTStrategy();
require('./src/startup/logging')
app.use('/api/etz',restRouter);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
    })
  );
app.use(serverError)

// app.listen(PORT, ()=> debug.info(`server is running on port ${PORT}`));
app.listen(PORT, ()=> winston.info(`server is running on port ${PORT}`));