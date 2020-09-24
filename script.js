$(document).ready(function () {
  $("#searchB").on("click", function (event) {
    // initiating upon clicking on the search
    event.preventDefault();

    var userOption = $("#UserSearch").val();
    var APIKey = "385709-project1-WLBPHP8D";

    var divQueryURL =
      "https://tastedive.com/api/similar?info=1&origin=*&q=" +
      userOption +
      "&k=" +
      APIKey +
      "&callback=?";

    console.log(userOption);
    console.log(divQueryURL);

    $.getJSON(divQueryURL).then(function (response) {
      //API tasteDive
      console.log(response);

      for (var i = 0; i < response.Similar.Results.length; i++) {
        //looping at the recommendations and add on the cards
        var typeID = "#Sug" + i;
        var SuggText = "#Suggestion" + i;
        $(typeID).text(response.Similar.Results[i].Type);
        $(SuggText).text(response.Similar.Results[i].Name);

        //passing each recommandations to the wiki api
        wikiAPI =
          "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&origin=*&exlimit=1&titles=" +
          response.Similar.Results[i].Name +
          "&explaintext=1&format=json";

        $.ajax({
          url: wikiAPI,
          method: "GET",
        }).then(function (response) {
          console.log(response);
        });
      }
    });
  });
});
