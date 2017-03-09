// Dependencies
var VoteProxy = require('../../proxy/vote.proxy.js');
var Promise = require('bluebird');

// GET votes/
var getVotes = function (req, res, next) {
  VoteProxy.getVotes().then(function (votes) {
    res.status(200);
    res.send(votes);
  }).catch(next);
};
exports.getVotes = getVotes;

// POST votes/
var postVote = function (req, res, next) {
  var sendvote = function (vote) {
    res.statusCode = 201;
    res.send(vote);
  };
  var handleError = function (err) {
    err.reqBody = vote;
    next(err);
  }
  
  var vote = req.body;
  VoteProxy.postVote(vote).then(sendvote).catch(handleError);
};
exports.postVote = postVote;
