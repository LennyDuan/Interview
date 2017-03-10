// DB proxy for Vote
// Here also include the DB proxy for the whole voting Process
// TODO: POST voting will create new Vote, new/update User, new/Update Candidate
var Vote = require('../models').Vote;
var User = require('../models').User;
var candidateProxy = require('../proxy/candidate.proxy.js');

exports.getVotes = function () {
  return Vote.find({}, {_id : 0, __v : 0});
};

exports.postVote = function (vote) {
  return new Vote(vote).save();
};

// I really hate this code... Will refactor with better Promise later.
// Do we really need to callback for multi save? I don't think so.
exports.updateCandidate = function (candidateID) {
  return candidateProxy.findCandidate(candidateID).then(function (candidate) {
    // If find candidate, vote plus one.
    if(candidate) {
      return candidateProxy.updateVoteCandidate(candidate);
    // If can not find candidate, create a new candidate and vote will be one.
    } else {
      return candidateProxy.createCandidate(candidateID);
    }
  });
};
