// Add some needed Dependencies
var config = require('./config.default');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('./middlewares/errorHandler');
var passport = require('passport');

// Express Framewrok
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
var viewRouter = require('./views.router');
app.use('/views/',  viewRouter);

var morgan = require('morgan');
app.use(morgan('combined'));
if(config.debug) app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// routes collection
var apiRouterV1 = require('./api.router.v1');
app.use('/api/v1/voting',  apiRouterV1); // do we want cors?

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(req.originalUrl + ' Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
