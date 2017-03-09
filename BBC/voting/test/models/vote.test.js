/**
 * Model test for Vote
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var Promise = require('bluebird');
var Vote = Models.Vote;
var deepcopy = require('deepcopy');
var should = require('chai').should();

describe('Vote Model', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function(done) {
    Vote.remove({}, done);
  });

  // Test Sample Data
  var voteSample = {userID : 1, candidateID : 'One'};
  var voteSampleSame = {userID : 1, candidateID : 'One'};
  var voteSampleNoUserID = {candidateID : 'One'};
  var voteSampleNoCandidateID = {userID : 1};

  it('should be able to save a vote to the db', function (done) {
    var vote = new Vote(voteSample);
    vote.save(done);
  });

  it('should be able to save same vote to the db', function (done) {
    var vote = new Vote(voteSample);
    var voteSame = new Vote(voteSampleSame);
    vote.save(function (err) {
      if(err) done(err);
      else{
        var voteSampleSame = voteSampleSame;
        voteSame.save(function (err) {
          if(err) throw done(err);
          else {
            done();
          }
        });
      }
    });
  });

  it('should not be able to save a non-userID vote to the db', function(done) {
    var vote = new Vote(voteSampleNoUserID);
    vote.save(function (err) {
      if(err) done();
      else{
        err.should.not.equal(null);
        done();
      }
    });
  });

  it('should not be able to save a non-candidateID vote to the db', function(done) {
    var vote = new Vote(voteSampleNoCandidateID);
    vote.save(function (err) {
      if(err) done();
      else{
        err.should.not.equal(null);
        done();
      }
    });
  });
});
