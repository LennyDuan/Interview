/**
 * Proxy test for Candidate
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var Candidate = Models.Candidate;
var candidateProxy = require('../../proxy/candidate.proxy.js');
var should = require('chai').should();

describe('Candidate Model Proxy', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function (done) {
    Candidate.remove({}, done);
  });

  // Test Sample data
  var candidateSample = {candidateID : 'One', vote : 10, validVote : 5};

  it('findCandidate should return one candidate if find a candidate', function (done) {
    var candidate = new Candidate(candidateSample);
    candidate.save(function (err) {
      if (err) done(err);
      else {
        candidateProxy.findCandidate('One').then(function (candidate) {
          candidate.candidateID.should.equal('One');
          candidate.vote.should.equal(10);
          done();
        }, done);
      }
    });
  });

  it('createCandidate should create a new candidate with 1 vote', function (done) {
    candidateProxy.createCandidate('New').then(function (candidate) {
      candidate.candidateID.should.equal('New');
      candidate.vote.should.equal(1);
      done();
    });
  });

  it('updateVoteCandidate should increase 1 for votes number', function (done) {
    var candidate = new Candidate(candidateSample);
    candidate.save(function (err) {
      if (err) done(err);
      else {
        candidateProxy.updateVoteCandidate(candidate).then(function (candidate) {
          candidate.candidateID.should.equal('One');
          candidate.vote.should.equal(11);
          done();
        }, done);
      }
    });
  });

  it('updateValideVoteCandidate should increase 1 for valid votes number', function (done) {
    var candidate = new Candidate(candidateSample);
    candidate.save(function (err) {
      if (err) done(err);
      else {
        candidateProxy.updateValidVoteCandidate(candidate).then(function (candidate) {
          candidate.candidateID.should.equal('One');
          candidate.validVote.should.equal(6);
          done();
        }, done);
      }
    });
  });
});
