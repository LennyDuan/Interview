// Dependencies
var CandidateProxy = require('../../proxy/candidate.proxy.js');
var Promise = require('bluebird');

// GET votes/
var getCandidates = function (req, res, next) {
  CandidateProxy.getCandidates().then(function (candidates) {
    res.status(200);
    res.send(candidates);
  }).catch(next);
};
exports.getCandidates = getCandidates;
