/**
 * Model test for User
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var Promise = require('bluebird');
var User = Models.User;
var deepcopy = require('deepcopy');
var should = require('chai').should();

describe('User Model', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function(done) {
    User.remove({}, done);
  });

  // Test Sample Data
  var userSample = {userID : 1, maxVote : 1, candidateOne : 'One'};
  var userSampleNoUserID = {maxVote : 2, candidateOne : 'One', candidateTwo : 'Two'};
  var userSampleMaxVoteLager = {userID : 1, maxVote : 4};

  it('should be able to save a user to the db', function (done) {
    var user = new User(userSample);
    user.save(done);
  });

  it('should not be able to save a non-userID User to the db', function(done) {
    var user = new User(userSampleNoUserID);
    user.save(function (err) {
      if(err) done();
      else{
        err.should.not.equal(null);
        done();
      }
    });
  });

  it('should not be able to save a maxVote-lagger-than-3 User to the db', function(done) {
    var user = new User(userSampleMaxVoteLager);
    user.save(function (err) {
      if(err) done();
      else{
        err.should.not.equal(null);
        done();
      }
    });
  });
});
