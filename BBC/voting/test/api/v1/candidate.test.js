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

// API path for candidates
var path = '/api/v1/voting/candidates/';
describe('/api/v1/voting/candidates/', function () {

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
  var candidateOne = {candidateID : 'One', vote : 10, validVote : 5};
  var candidateTwo = {candidateID : 'Two', vote : 11, validVote : 7};
  var candidateThree = {candidateID : 'Three', vote : 13, validVote : 8};

  describe('GET', function () {
    it('should list and return all votes', function (done) {
      var saveThreeCandidate = Promise.all([new Candidate(candidateOne).save(),
        new Candidate(candidateTwo).save(),
        new Candidate(candidateThree).save()]);

        saveThreeCandidate.then(function () {
          request.get(path)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.length.should.equal(3);
            var candidates = res.body;
            candidates.forEach(function (candidate) {
              candidate.candidateID.should.not.equal(null);
            });
          })
          .end(done);
        }, done);
      });
    });
  });
