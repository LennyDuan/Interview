// CountMeUp only get data from Votes.
// Should get the final result for candidates with an algorithms 
var Vote = require('../models').Vote;

exports.getCandidates = function () {
  return Vote.find({}, {_id : 0, __v : 0});
};
