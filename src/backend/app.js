var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var supersetsRouter = require('./routes/supersets');
var setsRouter = require('./routes/sets');
var cardsRouter = require('./routes/cards');
var statsRouter = require('./routes/stats');

var loginModule = require('@at41/login-module');
loginModule.setDatabaseCredials({
  connectionLimit : 5,
  host     : 'localhost',
  user     : 'mainUser',
  password : 'fulfillmentOverHappiness',
  database : 'login_system'
});

var app = express();

/**
 * Modify CORS policy
 * Based off: https://brianflove.com/2017-03-22/express-cors-typescript/
 */
const API_URL = ['http://localhost:4200'];
const options = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: API_URL,
  preflightContinue: false
};
app.use(cors(options));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// specifies what paths match to which router
app.use('/', indexRouter);
app.use('/supersets', supersetsRouter);
app.use('/sets', setsRouter);
app.use('/base_cards', cardsRouter);
app.use('/sessions', loginModule.sessionsRoutes);
app.use('/users', loginModule.usersRoutes);
app.use('/stats', statsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
