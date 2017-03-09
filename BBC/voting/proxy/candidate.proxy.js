// DB proxy for Candidate
var Candidate = require('../models').Candidate;
var Promise = require('bluebird');

exports.getCandidates = function () {
  return Candidate.find({}, {_id : 0, __v : 0});
};
