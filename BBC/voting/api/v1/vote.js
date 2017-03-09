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
