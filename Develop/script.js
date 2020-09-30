$(document).ready(function () {
  var youtArray = [];
  returnStoredSearch(); // getting the last seach item

  // initiating upon clicking on the search
  $("#searchB").on("click", function (event) {
    event.preventDefault();
    //fetch user input
    var userOption = $("#UserSearch").val();
    // the validation on the search button when the text input is empty
    if (userOption == null || userOption == "") {
      $("#bestmatches").html("Please type in the box");
      return;
    }
    tasteDiveAPI(userOption); //call tastedive api passing the input value
  });
  //call wiki api upon clicking on the suggestion card
  $("button.card").on("click", function (event) {
    event.preventDefault();
    emptyWikitext();
    //get the recommended title by clicking on the card
    var recommenText = $(this).attr("data-id");
    //get the last number from the card id to fetch youtube link
    var getIdNumber = $(this).attr("id").slice(-1);
    //get youtube link and put on iframe src
    if (getIdNumber == 1) {
      $("#ytplayer").attr("src", youtArray[1]);
    } else if (getIdNumber == 2) {
      $("#ytplayer").attr("src", youtArray[2]);
    } else if (getIdNumber == 3) {
      $("#ytplayer").attr("src", youtArray[3]);
    } else if (getIdNumber == 4) {
      $("#ytplayer").attr("src", youtArray[4]);
    } else if (getIdNumber == 5) {
      $("#ytplayer").attr("src", youtArray[5]);
    } else {
      getIdNumber == 6;
      $("#ytplayer").attr("src", youtArray[6]);
    }
    //call wiki api passing the recommended title
    wikiAPI(recommenText);
  });

  //Taste dive api
  function tasteDiveAPI(userOption) {
    var divQueryURL =
      "https://tastedive.com/api/similar?info=1&origin=*&q=" +
      userOption +
      "&k=385709-project1-WLBPHP8D&callback=?";

    //inseart the user search on local storage
    localStorage.setItem("lastSearch", JSON.stringify(userOption));

    $.getJSON(divQueryURL).then(function (response) {
      //API tasteDive
      youtArray = []; //clean youtube links array
      //looping at the recommendations and add on the cards
      for (var i = 0; i < response.Similar.Results.length; i++) {
        //getting the id for each card button
        var typeID = "#Sug" + i;
        var SuggText = "#Suggestion" + i;
        var buttonCard = "#cardbutton" + i;
        //add the type of suggestion on the card
        $(typeID).text(response.Similar.Results[i].Type);
        //add the suggestion on the card text
        $(SuggText).text(response.Similar.Results[i].Name);
        //set data attibute to the card
        $(buttonCard).attr("data-id", response.Similar.Results[i].Name);
        //add youtube link to the youtubearray
        youtArray.push(response.Similar.Results[i].yUrl);
      }
      //adding the text to the h2 concatenating usr input
      $("#bestmatches").text('Best Matches for "' + userOption + '"');
    });
  }

  //passing recommandations to the wiki api;
  function wikiAPI(suggestion) {
    //wiki query url
    wikiAPIURL =
      "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&origin=*&exlimit=1&titles=" +
      suggestion +
      "&explaintext=1&format=json";

    //adding the last recommendation clicked to the local storage
    localStorage.setItem("lastSuggestion", JSON.stringify(suggestion));
    //wiki api call
    $.ajax({
      url: wikiAPIURL,
      method: "GET",
      statusCode: {
        404: function () {
          $("#wikiText").text(
            "No wiki information found for  '" + suggestion + "'. Try again"
          );
        },
      },
    }).then(function (response) {
      //using object.keys to identify the page number (which is an object key)
      var pageNumber = Object.keys(response.query.pages);
      //adding the text on the "more about"
      $("#wikiHeaderText").text('More about "' + suggestion + '"');
      //adding the wiki api text on the screen
      $("#wikiText").text(response.query.pages[pageNumber].extract);
    });
  }

  function returnStoredSearch() {
    //get the last search from the local storage
    var storedSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (storedSearch !== null) {
      tasteDiveAPI(storedSearch);
    }
    //get the last recommended option clicked from the local storage
    var storedSuggestion = JSON.parse(localStorage.getItem("lastSuggestion"));
    if (storedSuggestion !== null) {
      wikiAPI(storedSuggestion);
    }
  }
});

function emptyWikitext() {
  $("#wikiText").empty();
  $("#wikiHeaderText").empty();
  $("#ytplayer").attr("src", "");
}

//button to clear local storage
$(".btn-danger").on("click", clearLocalStorage);
function clearLocalStorage() {
  location.reload();
  window.localStorage.clear();
}

//Function to show a modal acknowleding feedback on the contact page
function showModal() {
  $("#confirm-modal").modal();
}

$('#theForm input[type="text"]').blur(function () {
  if (!$(this).val()) {
    $(this).addClass("error");
  } else {
    $(this).removeClass("error");
  }
});
