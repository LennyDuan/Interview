// Change json data to params 
var serialize = function (obj) {
	var str = [];
	for(var p in obj)
	if (obj.hasOwnProperty(p)) {
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	}
	return str.join("&");
}
// Give warning error input message
var showWarningMessage = function (msg) {
  var body = "<div class='alert alert-warning alert-dismissable fade in'>" +
  "<a ref='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
  "<strong>Message</strong> : " + msg +
  "</div>"
  return body;
};

// Show Candidate Result Bar
var showResultBar = function (data) {
  var totalVotes = 0, totalValidVotes = 0;

  // get Total and validVote
  data.forEach(function(candidate) {
    totalVotes += candidate.vote;
    totalValidVotes += candidate.validVote;
  });

  // Sort candidate in ordre
  data.sort(function(a,b){
    return b.validVote - a.validVote;
  })

  // Create process bar to display the result
  var body = "<div class='canRanking'><h2>Candidates Rankings:</h2>";
  data.forEach(function(candidate) {
    var candidateID = candidate.candidateID;
    var vote = candidate.vote;
    var validVote = candidate.validVote;
    var votePer = parseInt(vote / totalVotes * 100);
    var validVotePer = parseInt((validVote / totalValidVotes * 100));
    console.log( candidateID + validVote + '________' + totalValidVotes + "------" + validVotePer);

    body += "<h4>Name: " + candidateID + "</h4>";
    body += "<h5>ValidVotes: " + validVote + " - " + validVotePer + "% | TotalVotes: " + vote + " - " + votePer + "%</h5>";
    body += "<div class='progress'> <div class='progress-bar' role='progressbar'" +
    "style='width:" + validVotePer + "%'> " + validVotePer + "% </div> </div>"
  });

  body += "</div>";
  return body;
};
