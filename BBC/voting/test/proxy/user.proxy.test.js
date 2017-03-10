/**
 * Proxy test for User
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var User = Models.User;
var userProxy = require('../../proxy/user.proxy.js');
var should = require('chai').should();

describe('User Model Proxy', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function (done) {
    User.remove({}, done);
  });

  // Test Sample data
  var userSampleOneVote = {userID : 1, maxVote : 1, candidateOne : "One"};
  var userSampleTwoVote = {userID : 2, maxVote : 2, candidateOne : 'One', candidateTwo : 'Two'};
  var userSampleThreeVote =
  {userID : 3, maxVote : 3, candidateOne : 'One', candidateTwo : 'Two', candidateThree : "Three"};

  var voteSample = {userID: 4, candidateID : 'New'}
  var voteSampleUserOne = {userID : 1, candidateID : 'New'};
  var voteSampleUserTwo = {userID : 2, candidateID : 'New'};

  it('findUser should return one user if find a user', function (done) {
    var user = new User(userSampleOneVote);
    user.save(function (err) {
      if (err) done(err);
      else {
        userProxy.findUser(1).then(function (user) {
          user.userID.should.equal(1);
          user.maxVote.should.equal(1);
          done();
        }, done);
      }
    });
  });

  it('createUser should create a new user with 1 maxVote and one candidate', function (done) {
    var vote = voteSample;
    userProxy.createUser(vote).then(function (user) {
      user.userID.should.equal(4);
      user.maxVote.should.equal(1);
      user.candidateOne.should.equal('New');
      done();
    });
  });

  it('validVote should return true if maxVote is less then 3', function (done) {
    var user = new User(userSampleTwoVote);
    user.save(function (err) {
      if (err) done(err);
      else {
        userProxy.validVote(2).then(function (result) {
          result.should.equal(true);
          done();
        }, done);
      }
    });
  });

  it('validVote should return false if maxVote is equal/larger then 3', function (done) {
    var user = new User(userSampleThreeVote);
    user.save(function (err) {
      if (err) done(err);
      else {
        userProxy.validVote(3).then(function (result) {
          result.should.equal(false);
          done();
        }, done);
      }
    });
  });

  it('updateUser should add second candidate if maxVote equal 1', function (done) {
    var user = new User(userSampleOneVote);
    user.save(function (err) {
      if (err) done(err);
      else {
        userProxy.updateUser(voteSampleUserOne).then(function (user) {
          user.userID.should.equal(1);
          user.maxVote.should.equal(2);
          user.candidateTwo.should.equal("New");
          done();
        }, done);
      }
    });
  });

  it('updateUser should add third candidate if maxVote equal 2', function (done) {
    var user = new User(userSampleTwoVote);
    user.save(function (err) {
      if (err) done(err);
      else {
        userProxy.updateUser(voteSampleUserTwo).then(function (user) {
          user.userID.should.equal(2);
          user.maxVote.should.equal(3);
          user.candidateThree.should.equal("New");
          done();
        }, done);
      }
    });
  });
});
