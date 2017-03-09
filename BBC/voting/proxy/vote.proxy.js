// DB proxy for Vote
var Coupon = require('../models').Vote;
var Promise = require('bluebird');

exports.getVotes = function () {
  return Coupon.find({}, {_id : 0, __v : 0});
};
