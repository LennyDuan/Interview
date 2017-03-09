/**
 * Model test for Candidate
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var Promise = require('bluebird');
var Candidate = Models.Candidate;
var deepcopy = require('deepcopy');
var should = require('chai').should();

describe('Candidate Model', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function(done) {
    Candidate.remove({}, done);
  });

  // Test Sample Data
  var candidateSample = {candidateID : 'One', vote : 10, validVote : 5};
  var candidateSampleNoID = {vote : 10, validVote : 5};

  it('should be able to save a user to the db', function (done) {
    var candidate = new Candidate(candidateSample);
    candidate.save(done);
  });

  it('should not be able to save a non-candidateID User to the db', function(done) {
    var candidate = new Candidate(candidateSampleNoID);
    candidate.save(function (err) {
      if(err) done();
      else{
        err.should.not.equal(null);
        done();
      }
    });
  });
});
