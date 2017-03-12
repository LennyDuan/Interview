// CountMeUp only get data from Votes.
// Should get the final result for candidates with an algorithms
var Vote = require('../models').Vote;

exports.getCandidates = function () {
  return Vote.find({}, {_id : 0, __v : 0});
};

// Big data algorithm below:

Array.prototype.repeat= function(what, L){
 while(L) this[--L]= what;
 return this;
};
var candidates = ['one', 'two', 'three', 'four', 'five'];
var candidateCount = [0, 0, 0, 0, 0];
var userArray = [].repeat(0, 100000);;
var validVote = 0;
exports.getVotesCount = function () {
  return Vote.count({});
};
exports.getCandidatesResult = function (candidateID) {
  return this.iterateVotes();
};

var iterateVotes = function () {
  var stream = Vote.find().stream();
  stream.on ("data", function (data){
    var userID = data.userID;
    var candidateID = data.candidateID;
    userArray[userID] = userArray[userID] + 1;
    var index = candidates.indexOf(candidateID);
    if (userArray[userID] <= 3) {
      candidateCount[index]++;
      validVote++;
    }
  })
  .on ("end", function (){
    return candidateCount;
  });
}
