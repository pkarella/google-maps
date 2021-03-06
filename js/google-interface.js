var apiKey = require('./../.env').apiKey;
var Map= require('./../js/map.js').googleModule;

//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   });
// }

// $.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=campgrounds+in+'+ city +'&key=' + apiKey, function(response) {
//   console.log(response);
// });

$(document).ready(function(){
  var newMap = new Map(47.6062095, -122.3320708);
  $('#form').submit(function(event){
    var city = $('#input').val();
    $('#input').val("");
    var locLatitude,locLongitude;
    $.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=+in+'+ city +'&key=' + apiKey, function(response) {
      var latitude = response.results[0].geometry.location.lat;
      var longitude = response.results[0].geometry.location.lng;
      var cityMap = new Map(latitude, longitude);

      $.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=landmarks+in+'+ city +'&key=' + apiKey, function(response) {
        for(var i=0; i<response.results.length; i++)
        {
          locLatitude = response.results[i].geometry.location.lat;
          locLongitude = response.results[i].geometry.location.lng;
          cityMap.marker(locLatitude,locLongitude);
        }
      });
    });
      event.preventDefault();
  });
});
