// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var Promise = require('bluebird');
var Vote = Models.Vote;
var deepcopy = require('deepcopy');
var should = require('chai').should();
var voteProxy = require('../../proxy/vote.proxy.js');

describe('Create Votes Data:', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function(done) {
  //  Vote.remove({}, done);
    done();
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Uncomment below to Create test data

  // it('create 100,000 random votes data to the db', function (done) {
  //   var candidates = ['one', 'two', 'three', 'four', 'five'];
  //   for (var num = 0; num < 100000; num ++) {
  //     var userID = getRandomInt(0 , 25000);
  //     var candidateID = candidates[getRandomInt(0 , 5)];
  //     var vote = {userID : userID, candidateID : candidateID};
  //     var vote = new Vote(vote);
  //     console.log('Create vote: ' + num);
  //     vote.save();
  //   }
  //   console.log('Finish Creating Data');
  //   done();
  // });

  // it('should return all votes', function (done) {
  //   Vote.count({}, function( err, count){
  //     console.log( "Number of users:", count );
  //     done();
  //   })
  // });
});
