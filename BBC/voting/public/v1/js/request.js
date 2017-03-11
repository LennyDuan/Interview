// Click button to create a vote
$(document).ready(function (){
  $('#vote-post').submit(function ( event ) {
    var postUrl = "../api/v1/voting/votes/";
    var userID = parseInt($("#vote-userID").val());
    var candidateID = $('#vote-candidateID').val();
    var vote = {
      userID: userID,
      candidateID: candidateID
    };
    $.ajax({
      type: "POST",
      url: postUrl,
      data: JSON.stringify(vote),
      contentType: "application/json",
      success: function (data, textStatus, xhr)
      {
        $('#vote-result').html(showWarningMessage("Have create a vote for candidate: " + data.candidateID));
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#vote-result').html(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
      }
    });
    event.preventDefault();
  });
});

// Click button to send HTTP GET candidates from Candidate DB
$(document).ready(function (){
  $('#candidates-get').submit(function ( event ) {
    var getUrl = "../api/v1/voting/candidates/";
    $.ajax({
      type: "GET",
      url: getUrl,
      contentType: "application/json",
      success: function (data, textStatus, xhr)
      {
        $('#candidates-result').html(showResultBar(data));
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#candidates-result').html(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
      }
    });
    event.preventDefault();
  });
});

// Click button to send HTTP GET candidates from Votes Calculation
$(document).ready(function (){
 $('#candidates-count').submit(function ( event ) {
   var getUrl = "../api/v1/voting/candidates/countMeUp/";
   $.ajax({
     type: "GET",
     url: getUrl,
     contentType: "application/json",
     success: function (data, textStatus, xhr)
     {
       console.log(data);
       //$('#count-result').html(showResultBar(data));
     },
     error: function (XMLHttpRequest, textStatus, errorThrown) {
       $('#count-result').html(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
     }
   });
   event.preventDefault();
 });
});
