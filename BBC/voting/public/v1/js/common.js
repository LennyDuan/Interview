// Give warning error input message
var showWarningMessage = function (msg) {
  var body = "<div class='alert alert-warning alert-dismissable fade in'>" +
  "<a ref='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
  "<strong>Message</strong> : " + msg +
  "</div>"
  return msg;
};

// Show Candidate Result Bar
var showResultBar = function (data) {
  var body = "<div>Here is the result</div>"
  return body;
};
