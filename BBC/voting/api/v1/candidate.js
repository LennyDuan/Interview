// Dependencies
var CandidateProxy = require('../../proxy/candidate.proxy.js');
var countMeUpProxy = require('../../proxy/countMeUp.proxy.js');

var Promise = require('bluebird');

// GET Candidate From Candidate DB
var getCandidates = function (req, res, next) {
  CandidateProxy.getCandidates().then(function (candidates) {
    res.status(200);
    res.send(candidates);
  }).catch(next);
};
exports.getCandidates = getCandidates;


// GET Candidate From Votes CountMeUp - Stop Big Data - Still big data
var countMeUp = function (req, res, next) {
  res.status(200);
  res.send("No correct direction - Big data - Count Me Up Stop!!!");
  // countMeUpProxy.getCandidatesResult().then(function (candidates) {
  //   res.status(200);
  //   res.send(candidates);
  // }).catch(next);
};
exports.countMeUp = countMeUp;
