// Dependencies
var app = require('../../../app');
var request = require('supertest')(app);
var Models = require('../../../models');
var Vote = Models.Vote;
var User = Models.User;
var Candidate= Models.Candidate;
var config = require('../../../config.default');
var Promise = require('bluebird');
var deepcopy= require('deepcopy');
var should = require('chai').should();
var userProxy = require('../../../proxy/user.proxy.js');
var candidateProxy = require('../../../proxy/candidate.proxy.js');

// API path for vote
var path = '/api/v1/voting/votes/';
describe('/api/v1/votes/', function () {

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

  // Test Sample Data
  var voteSample = {userID : 1, candidateID : 'One'};
  var voteSampleTwo = {userID : 2, candidateID : 'Two'};
  var voteSampleInvalid = {userID : 3};

  // GET votes won't be used for this challenge requirement
  // Create this API first to test the API structure is correct
  describe('GET', function () {
    it('should list and return all votes', function (done) {
      var saveTwoVotes = Promise.all([new Vote(voteSample).save(),new Vote(voteSampleTwo).save()]);
      saveTwoVotes.then(function () {
        request.get(path)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.length.should.equal(2);
          var votes = res.body;
          votes.forEach(function (vote) {
            vote.userID.should.not.equal(null);
          });
        })
        .end(done);
      }, done);
    });
  });

  describe('DELETE', function () {
    // DELETE votes won't be used for this challenge requirement
  });

  describe('POST', function () {

    it('should create a vote for a new vote with new user and candidate then return 201', function (done) {
      request.post(path)
      .send(voteSample)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err) {
        if (err) done(err);
        else {
          Vote.find({ userID: 1 }).then(function (votes) {
            (votes.length).should.equal(1);
          });
          // Vote should create a new user
          userProxy.findUser(1).then(function (user) {
            user.userID.should.equal(1);
            user.maxVote.should.equal(1);
          }, done);

          // Vote should create a candidate with votes 1
          candidateProxy.findCandidate('One').then(function (candidate) {
            candidate.candidateID.should.equal('One');
            candidate.vote.should.equal(1);
            candidate.validVote.should.equal(1);
          }, done);

          done();
        }
      });
    });

    it('should create a vote for update invalid user and candidate without validVote and return 201', function (done) {
      var userSampleThreeVote =
      {userID : 8, maxVote : 3, candidateOne : 'One', candidateTwo : 'Two', candidateThree : "Three"};
      var voteSample = {userID : 8, candidateID : 'One'};
      var candidateSample = {candidateID : 'One', vote : 10, validVote : 5};

      var saveData = Promise.all([new User(userSampleThreeVote).save(), new Candidate(candidateSample).save()]);
      saveData.then(function() {
        request.post(path)
        .send(voteSample)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err) {
          if (err) done(err);
          else {
            var voteFind = Vote.find({ userID: 8 }).then(function (votes) {
              (votes.length).should.equal(1);
            });
            // Vote should not update a user
            var userFind = userProxy.findUser(8).then(function (user) {
              user.userID.should.equal(8);
              user.maxVote.should.equal(3);
            });
            // Vote should update candidate without  validvotes 1
            var candidateFind = candidateProxy.findCandidate('One').then(function (candidate) {
              candidate.candidateID.should.equal('One');
              candidate.vote.should.equal(11);
              candidate.validVote.should.equal(5);
            });
            Promise.all([voteFind, userFind, candidateFind]).then(function () {
              done();
            });
          }
        });
      }, done);
    });

    it('should create a vote for update user and candidate with validVote and return 201', function (done) {
      var userSampleTwoVote =
      {userID : 8, maxVote : 2, candidateOne : 'One', candidateTwo : 'Two'};
      var voteSample = {userID : 8, candidateID : 'One'};
      var candidateSample = {candidateID : 'One', vote : 10, validVote : 5};

      var saveData = Promise.all([new User(userSampleTwoVote).save(), new Candidate(candidateSample).save()]);
      saveData.then(function() {
        request.post(path)
        .send(voteSample)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err) {
          if (err) done(err);
          else {
            var voteFind = Vote.find({ userID: 8 }).then(function (votes) {
              (votes.length).should.equal(1);
            });
            // Vote should not update a user
            var userFind = userProxy.findUser(8).then(function (user) {
              user.userID.should.equal(8);
              user.maxVote.should.equal(3);
              user.candidateThree.should.equal('One');
            });
            // Vote should update candidate without  validvotes 1
            var candidateFind = candidateProxy.findCandidate('One').then(function (candidate) {
              candidate.candidateID.should.equal('One');
              candidate.vote.should.equal(11);
              candidate.validVote.should.equal(6);
            });
            
            Promise.all([voteFind, userFind, candidateFind]).then(function () {
              done();
            });
          }
        });
      }, done);
    });

    it('should not create a vote for an invalid vote and return 400', function (done) {
      request.post(path)
      .send(voteSampleInvalid)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function (err) {
        if (err) done();
        else {
          Vote.find({ userID: 3 }).then(function (votes) {
            (votes.length).should.equal(0);
            done();
          });
        }
      });
    });
  });

});
