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
        $('#vote-post').append(showWarningMessage("Have create a vote for candidate: " + data.candidateID));
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#vote-post').append(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
      }
    });
    event.preventDefault();
  });
});

// Click button to create a vote
$(document).ready(function (){
  $('#candidates-get').submit(function ( event ) {
    var getUrl = "../api/v1/voting/candidates/";
    $.ajax({
      type: "GET",
      url: getUrl,
      contentType: "application/json",
      success: function (data, textStatus, xhr)
      {
        $('#candidates-get').append(showResultBar(data));
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#candidates-get').append(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
      }
    });
    event.preventDefault();
  });
});
