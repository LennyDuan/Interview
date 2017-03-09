// DB proxy for Vote
var Vote = require('../models').Vote;
var User = require('../models').User;
var Candidate = require('../models').Candidate;

var Promise = require('bluebird');

exports.getVotes = function () {
  return Vote.find({}, {_id : 0, __v : 0});
};

exports.postVote = function (vote) {
  return new Vote(vote).save();
};
