// DB proxy for Candidate
var Candidate = require('../models').Candidate;

exports.getCandidates = function () {
  return Candidate.find({}, {_id : 0, __v : 0});
};

// Candidate created by a vote, total vote should be 1 when it be created.
exports.createCandidate = function (candidateID) {
  var candidate = {candidateID : candidateID, vote : 1};
  return new Candidate(candidate).save();
}

exports.findCandidate = function (candidateID) {
  return Candidate.findOne({candidateID : candidateID});
}

// increase valid candidate votes with 1
exports.updateVoteCandidate = function (candidate) {
    var vote = candidate.vote + 1;
    return Candidate.findByIdAndUpdate(candidate._id, { $set : { vote : vote} }, { 'new': true });
}

// increase valid candidate valid votes with 1
exports.updateValidVoteCandidate = function (candidate) {
    var validVote = candidate.validVote + 1;
    return Candidate.findByIdAndUpdate(candidate._id, { $set : { validVote : validVote} }, { 'new': true });
}
