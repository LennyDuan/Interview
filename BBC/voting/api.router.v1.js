// Routers for API paths

// Dependencies
var express = require('express');
var info = require('./api/v1/info');
var vote = require('./api/v1/vote');
var user = require('./api/v1/user');
var candidate = require('./api/v1/candidate');
var errorHandler = require('./middlewares/errorHandler');
var passport = require('passport');
// Router
var router = express.Router();
// Others
// User api
//router.post('/users/:userID', errorHandler.apiErrorHandler);
// Vote api
router.get('/votes/', vote.getVotes, errorHandler.apiErrorHandler);
//router.post('/votes/:voteID', errorHandler.apiErrorHandler);
//// Candidate api
router.get('/candidates', errorHandler.apiErrorHandler);

//for test purpose
router.get('/error/api', function (req, res, next) {
  var err = new Error('This is an Error for test api errors');
  err.api = true;
  err.status = 406;
  next(err);
}, errorHandler.apiErrorHandler);

module.exports = router;
