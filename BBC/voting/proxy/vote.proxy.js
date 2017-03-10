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

// I really hate this code... Will refactor with better Promise later.
// Do we really need to callback for multi save? I don't think so.
exports.updateCandidate = function (candidateID) {
  return Candidate.findOne({candidateID : candidateID}).then(function (candidate) {
    // If find candidate, vote plus one.
    if(candidate) {
      var vote = candidate.vote + 1;
      return Candidate.findByIdAndUpdate(candidate._id, { $set : { vote : vote} }, { 'new': true });
    // If can not find candidate, create a new candidate and vote will be one.
    } else {
      var candidate = {candidateID : candidateID, vote : 1};
      return new Candidate(candidate).save();
    }
  })
};
