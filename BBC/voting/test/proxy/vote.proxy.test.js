/**
 * Proxy test for  vote
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var Candidate = Models.Candidate;
var User = Models.User;
var Vote = Models.Vote;
var voteProxy = require('../../proxy/vote.proxy.js');
var userProxy = require('../../proxy/user.proxy.js');
var candidateProxy = require('../../proxy/candidate.proxy.js');
var should = require('chai').should();

describe('Vote Model Proxy: ', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function (done) {
    Candidate.remove({}, done);
  });

  // Test Sample data
  var candidateSample = {candidateID : 'One', vote : 10, validVote : 5};

  it('updateCandidate should save a new candidate if can not find candidateID', function (done) {
    voteProxy.updateCandidate("Two").then(function (candidate) {
      candidate.candidateID.should.equal("Two");
      candidate.vote.should.equal(1);
      done();
    }, done);
  });

  it('updateCandidate should return one more vote when find candidateID', function (done) {
    var candidate = new Candidate(candidateSample);
    candidate.save(function (err) {
      if (err) done(err);
      else {
        voteProxy.updateCandidate('One').then(function (candidate) {
          candidate.candidateID.should.equal('One');
          candidate.vote.should.equal(11);
          done();
        }, done);
      }
    });
  });
});

describe('Voting Proxy For modifyUser: ', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function (done) {
    User.remove({}, done);
  });

  var voteSample = {userID: 5, candidateID : 'New'}
  var userSample = {userID : 5, maxVote : 1, candidateOne : "One"};

  it('modifyUser should return a new user when cant find this userID', function (done) {
    voteProxy.modifyUser(voteSample).then(function (user) {
      user.userID.should.equal(5);
      user.maxVote.should.equal(1);
      user.candidateOne.should.equal('New');
      done();
    });
  });

  it('modifyUser should update user with new candidate', function (done) {
    var user = new User(userSample);
    user.save(function (err) {
      if (err) done(err);
      else {
        voteProxy.modifyUser(voteSample).then(function (user) {
          user.userID.should.equal(5);
          user.maxVote.should.equal(2);
          user.candidateTwo.should.equal('New');
          done();
        });
      }
    }, done);
  });
});

describe('Voting Proxy For modifyCandidate: ', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function (done) {
    Candidate.remove({},done);
  });

  var voteSample = {userID: 5, candidateID : 'NewCan'}
  var userSample = {userID : 5, maxVote : 1, candidateOne : "One"};
  var userSampleInvalid =
  {userID : 3, maxVote : 3, candidateOne : 'One', candidateTwo : 'Two', candidateThree : "Three"};
  var voteSampleSecond = {userID: 3, candidateID : 'NewCan'}

  var candidateSample = {candidateID : 'NewCan', vote : 4, validVote : 3};

  it('modifyCandidate should create a new candidate', function (done) {
    var user = new User(userSample);
    user.save(function (err) {
      if (err) done(err);
      else {
        voteProxy.modifyCandidate(voteSample).then(function (candidate) {
          candidate.candidateID.should.equal('NewCan');
          candidate.vote.should.equal(1);
          done();
        });
      }
    }, done);
  });

  it('modifyCandidate should add vote and validVote for a valid user', function (done) {
    var saveData = Promise.all([new User(userSample).save(), new Candidate(candidateSample).save()]);
    saveData.then(function () {
        voteProxy.modifyCandidate(voteSample).then(function (candidate) {
          candidate.candidateID.should.equal('NewCan');
          candidate.vote.should.equal(5);
          candidate.validVote.should.equal(4);
          done();
        });
    }, done);
  });

  it('modifyCandidate should add vote without validVote for invalid user (maxVote >= 3)', function (done) {
    var saveData = Promise.all([new User(userSampleInvalid).save(), new Candidate(candidateSample).save()]);
    saveData.then(function () {
        voteProxy.modifyCandidate(voteSampleSecond).then(function (candidate) {
          candidate.candidateID.should.equal('NewCan');
          candidate.vote.should.equal(5);
          candidate.validVote.should.equal(3);
          done();
        });
    }, done);
  });
});

describe('Voting Proxy For multiSave: ', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function (done) {
    User.remove({}, function() {
        Candidate.remove({}, function () {
          Vote.remove({}, done);
        }, done);
    }, done);
  });

  afterEach(function (done) {
    User.remove({}, function() {
        Candidate.remove({}, function () {
          Vote.remove({}, done);
        }, done);
    }, done);
  });

  var voteSample = {userID: 6, candidateID : 'NewOne'}
  it('multiSave should return a new user and a new candidate for a Vote', function (done) {
    var vote = new Vote(voteSample);
    vote.save(function (err) {
      if (err) done(err);
      else {
        voteProxy.multiSave(vote)
        .then(function (vote) {
          var userID = vote.userID;
          var candidateID = vote.candidateID;
          return userProxy.findUser(userID)
          .then (function (vote) {
            vote.userID.should.equal(6);
            vote.maxVote.should.equal(1);
            return candidateProxy.findCandidate(candidateID)
            .then (function (candidate) {
              candidate.candidateID.should.equal('NewOne');
              candidate.vote.should.equal(1);
              candidate.validVote.should.equal(1);
              done();
            });
          });
        }, done);
      }
    });
  });
});
