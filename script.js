$(document).ready(function () {
  $("#searchB").on("click", function (event) {
    event.preventDefault();

    var userOption = $("#userOption").val();
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
      console.log(response);
      wikiAPI(response.Similar.Results[0].Name);
    });
  });
});
function wikiAPI(name) {
  wikiAPI =
    "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&origin=*&exlimit=1&titles=" +
    name +
    "&explaintext=1&format=json";

  $.ajax({
    url: wikiAPI,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}
