const express = require('express');
const connectDB = require('./src/config/db.js');
const dotenv = require("dotenv");
const restRouter = require('./src/route/index.js');
const passport = require('passport');
const {configJWTStrategy} = require('./src/middlewares/passport-jwt.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./src/config/swagger.json");
const logger = require('morgan');
// import swaggerDocument from "./src/config/swagger.json";

dotenv.config();
const PORT = process.env.PORT;

connectDB();

const app = express();
app.use(express.json({ extended: false}));

require('./prod')(app);

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
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