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
       $('#count-result').html(showWarningMessage(data));
     },
     error: function (XMLHttpRequest, textStatus, errorThrown) {
       $('#count-result').html(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
     }
   });
   event.preventDefault();
 });
});

// Click button to send HTTP GET candidates from Votes Calculation
$(document).ready(function (){
 $('#algo-post').submit(function ( event ) {
   var getUrl = "../api/v1/voting/algorithm/countMeUp/";
   var votes = parseInt($("#algo-votes").val());
   var canOne = parseInt($('#algo-one').val());
   var canTwo = parseInt($('#algo-two').val());
   var canThree = parseInt($('#algo-three').val());
   var canFour = parseInt($('#algo-four').val());
   var canFive = parseInt($('#algo-five').val());
   var data = {
     votes: votes,
     canOne: canOne,
     canTwo: canTwo,
     canThree: canThree,
     canFour: canFour,
     canFive: canFive
   };
   console.log(data);
   $.ajax({
     type: "GET",
     url: getUrl,
     data: serialize(data),
     contentType: "application/json",
     success: function (data, textStatus, xhr)
     {
       console.log(data);
       $('#algo-result').html(showWarningMessage(data));
     },
     error: function (XMLHttpRequest, textStatus, errorThrown) {
       $('#algo-result').html(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
     }
   });
   event.preventDefault();
 });
});
