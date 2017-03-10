/**
 * Proxy test for  vote
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var Candidate = Models.Candidate;
var voteProxy = require('../../proxy/vote.proxy.js');
var should = require('chai').should();

describe('Vote Model Proxy', function () {

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
