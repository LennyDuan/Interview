var debug = require('../config.default').debug;
var mongoose = require('mongoose');

var dumpMongooseValidationErr = function (err) {
  if(err instanceof mongoose.Error.ValidationError){
    err.status = 400;
    err.message = 'Invalid Request';
    for (var field in err.errors) {
      err.message += '\r\n' + err.errors[field].message;
    }
  }
};

// api error send json response
exports.apiErrorHandler = function (err, req, res, next) {
  dumpMongooseValidationErr(err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    //stack: err.stack
  });
};
