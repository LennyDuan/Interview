// Routers for API paths

// Dependencies
var express = require('express');
var vote = require('./api/v1/vote');
var candidate = require('./api/v1/candidate');
var errorHandler = require('./middlewares/errorHandler');
var passport = require('passport');
// Router
var router = express.Router();
// Vote api
// router.get('/votes/', vote.getVotes, errorHandler.apiErrorHandler);
router.post('/votes/',vote.postVote, errorHandler.apiErrorHandler);
// Candidate api
router.get('/candidates/', candidate.getCandidates, errorHandler.apiErrorHandler);
// Count Me Up api
router.get('/candidates/countMeUp/', candidate.countMeUp, errorHandler.apiErrorHandler);

//for test purpose
router.get('/error/api', function (req, res, next) {
  var err = new Error('This is an Error for test api errors');
  err.api = true;
  err.status = 406;
  next(err);
}, errorHandler.apiErrorHandler);

module.exports = router;
