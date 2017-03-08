// Dependencies
var mongoose = require('mongoose');

// Schema
var voteSchema = mongoose.Schema(
  {
    userID: {type: Number, required: true},
    candidateID: {type: String, required: true},
    timestamps: true
  });

// Note sure use which attribute as index
voteSchema.index({userID: 1});

// Return Model
module.exports = mongoose.model('Vote', voteSchema);
