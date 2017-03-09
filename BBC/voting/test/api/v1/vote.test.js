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

// API path for vote
var path = '/api/v1/voting/votes/';
describe('/api/v1/votes/', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function (done) {
    Vote.remove({});
    User.remove({});
    Candidate.remove({}, done);
  });

  // Test Sample Data
  var voteSample = {userID : 1, candidateID : 'One'};
  var voteSampleTwo = {userID : 2, candidateID : 'Two'};

  // GET votes won't be used for this challenge requirement
  // Create this API first to test the API structure is correct
  describe('GET', function () {
    it('should list and return all votes', function (done) {
      var saveTwoVotes = Promise.all(
        [new Vote(voteSample).save(),
          new Vote(voteSampleTwo).save()]);

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
    it('should create a vote for a new vote and return 201', function (done) {
      request.post(path)
      .send({
        userID: voteSample.userID,
        candidateID: voteSample.candidateID
      })
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err) {
        if (err) done(err);
        else {
          Vote.find({ userID : 1 }, { _id : 0, __v : 0 }).should.not.equal(null);
          done();
        }
      });
    });
  });

});
