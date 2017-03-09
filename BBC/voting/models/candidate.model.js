// Dependencies
var mongoose = require('mongoose');

// Schema
var candidateSchema = mongoose.Schema(
  {
    candidateID: {type: String, required: true},
    vote: {type: Number, default: 0},
    validVote: {type: Number, default: 0},
  });

// Note sure use which attribute as index
candidateSchema.index({candidateID: 1});

// Return Model
module.exports = mongoose.model('Candidate', candidateSchema);
