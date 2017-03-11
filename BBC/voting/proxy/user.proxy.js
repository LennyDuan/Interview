// DB proxy for User
var User = require('../models').User;

// Not needed
exports.getUsers = function () {
  return User.find({}, {_id : 0, __v : 0});
};

// User created by a vote, maxVote vote should be 1 when it be created.
exports.createUser = function (vote) {
  var user = {userID : vote.userID, maxVote : 1, candidateOne : vote.candidateID};
  return new User(user).save();
}

exports.findUser = function (userID) {
  return User.findOne({userID : userID});
}

// To check if this vote is valid for this user
exports.validVote= function (userID) {
  return this.findUser(userID).then(function (user) {
    if(user) {
      if (user.maxVote >= 3) {
        return false;
      }
    }
    return true;
  });
}
// UpdateUser by some rules update User must use after findUser and validVote method
exports.updateUser = function (vote) {
  return this.findUser(vote.userID).then(function (user) {
    var maxVote = user.maxVote + 1;
    if (user.maxVote == 1) {
      return User.findByIdAndUpdate(user._id, { $set : { maxVote : maxVote, candidateTwo : vote.candidateID} }, { 'new': true });
    } else if (user.maxVote == 2){
      return User.findByIdAndUpdate(user._id, { $set : { maxVote : maxVote, candidateThree : vote.candidateID} }, { 'new': true });
    } else {
      return user;
    }
  });
}
