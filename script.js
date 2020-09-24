$(document).ready(function(){

$("#searchB").on("click", function(event){
    event.preventDefault();
    
var userOption= $ ("#userOption").val();
var APIKey ="385709-project1-WLBPHP8D"

var divQueryURL ="https://tastedive.com/api/similar?info=1&origin=*&q="+ userOption +"&k="+APIKey+"&callback=?";

console.log(userOption);
console.log(divQueryURL);

$.getJSON(
    divQueryURL
).then(function(response){
    console.log(response);
});

});
       


});