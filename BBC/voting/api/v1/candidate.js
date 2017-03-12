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


// GET Candidate From Votes CountMeUp - Stop Big Data
var countMeUp = function (req, res, next) {
  countMeUpProxy.getCandidates().then(function (candidates) {
    res.status(200);
    res.send("Wrong direction - Big data - Count Me Up Stop!!!");
  }).catch(next);
};
exports.countMeUp = countMeUp;
