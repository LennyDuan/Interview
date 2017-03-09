// Dependencies
var mongoose = require('mongoose');

// Schema
var userSchema = mongoose.Schema(
  {
    userID: {type: Number, required: true},
    maxVote: {type: Number, default: 0, max: 3},
    candidateOne: {type: String},
    candidateTwo: {type: String},
    candidateThree: {type: String},
  });

// Note sure use which attribute as index
userSchema.index({userID: 1});

// Return Model
module.exports = mongoose.model('User', userSchema);
