// Dependencies
var mongoose = require('mongoose');

// Schema
var userSchema = mongoose.Schema(
  {
    userID: {type: Number, required: true},
    maxVote: {type: Number, max: 3},
    candidateOne: {type: String},
    candidateTwo: {type: String},
    candidateThree: {type: String},
    timestamps: true
  });

// Note sure use which attribute as index
userSchema.index({userID: 1});

// Return Model
module.exports = mongoose.model('User', userSchema);
