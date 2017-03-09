// Dependencies
var mongoose = require('mongoose');
var config = require('../config.default');
mongoose.Promise = require('bluebird');

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    process.exit(1);
  }
});

// models
require('./user.model');
require('./vote.model');
require('./candidate.model');

exports.Vote = mongoose.model('Vote');
exports.Candidate = mongoose.model('Candidate');
exports.User = mongoose.model('User');
