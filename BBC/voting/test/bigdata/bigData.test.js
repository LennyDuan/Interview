// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var Promise = require('bluebird');
var Vote = Models.Vote;
var deepcopy = require('deepcopy');
var should = require('chai').should();
var countProxy = require('../../proxy/countMeUp.proxy.js');

describe('Create Votes Data:', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/voting_dev');
  });

  beforeEach(function(done) {
  //  Vote.remove({}, done);
    done();
  });

  // it('should iterate database', function (done) {
  //   countProxy.getCandidatesResult().then(function(count){
  //     console.log( "Result:", count );
  //     done();
  //   });
  // });
});
