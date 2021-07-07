'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const loggerMorgan = require('morgan');
const passport = require('passport');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require('./lib/swagger').getOptions();
const specs = swaggerJsdoc(swaggerOptions);

const logger = require('./lib/logger');
const config = require('./lib/config');
const log = logger(config.logger);
const secretConfig = require('./secretConfig');
const MongooseConnector = require('./lib/db/connectors/MongooseConnector');

require('./lib/security/authenticator')(passport, {
    secret: secretConfig.JWT_SECRET,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience
});

const authenticator = passport.authenticate('jwt', { session: false });

const BASE_PATH = config.api.server_base_path;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tokensRouter = require('./routes/tokens');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(loggerMorgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

app.use(async (req, res, next) => {
    await MongooseConnector.initialize();
    next();
});

app.use(`${BASE_PATH}/`, indexRouter);
app.use(`${BASE_PATH}/docs`, swaggerUi.serve, (...args) => swaggerUi.setup(specs)(...args));
app.use(`${BASE_PATH}/users`, usersRouter(authenticator));
app.use(`${BASE_PATH}/tokens`, tokensRouter());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
