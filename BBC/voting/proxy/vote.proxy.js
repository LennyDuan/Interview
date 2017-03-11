// DB proxy for Vote
// Here also include the DB proxy for the whole voting Process
// TODO: POST voting will create new Vote, new/update User, new/Update Candidate
var Vote = require('../models').Vote;
var User = require('../models').User;
var candidateProxy = require('../proxy/candidate.proxy.js');
var userProxy = require('../proxy/user.proxy.js');

exports.getVotes = function () {
  return Vote.find({}, {_id : 0, __v : 0});
};

// Post Vote will update user and candidate data then create a vote
exports.postVote = function (vote) {
  return this.multiSave(vote).then(function (vote) {
    return new Vote(vote).save();
  });
};

// Multi-Save, This is the compined proxy after one vote has been POST.
exports.multiSave = function (vote) {
  var self = this;
  var vote = vote;
  return this.modifyUser(vote)
  .then(function(user) {
    return self.modifyCandidate(vote)
    .then(function(candidate) {
      return vote;
    });
  });
};

// Modify user for a vote
exports.modifyUser = function (vote) {
  var userID = vote.userID;
  return userProxy.findUser(userID)
  .then(function (user){
    if (user) return userProxy.updateUser(vote);
    return userProxy.createUser(vote);
  });
}
// Modify Candidate for a vote
exports.modifyCandidate = function (vote) {
  var userID = vote.userID;
  var candidateID = vote.candidateID;
  return this.updateCandidate(candidateID)
  .then(function (candidate) {
    return userProxy.validVote(userID)
    .then(function (valid) {
      if (valid == true) return candidateProxy.updateValidVoteCandidate(candidate);
      return candidate;
    })
  });
}


// TODO I really hate this code... Will refactor with better Promise later.
// Do we really need to callback for multi save? I don't think so.
// Well, better use callback...
exports.updateCandidate = function (candidateID) {
  var candidateID = candidateID;
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
