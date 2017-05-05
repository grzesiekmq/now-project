angular.module('nowCtrls', []).controller('NowCtrl', function($http, $scope, $window) {
    var nc = this;

    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var marker;
    // click
    $window.map.addListener('click', function(event, $scope) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({ position: loc, map: $window.map, icon: './img/navigation.png', draggable: true });
        }



        console.log('pos:', loc.lat(), loc.lng());

        var c = confirm('Czy chcesz wyszukać najbliższe miejsca?');
        if (c) {

            infowindow = new google.maps.InfoWindow();

            var svc = new google.maps.places.PlacesService($window.map);
            svc.nearbySearch({ location: loc, radius: 1000 }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    for (var i = 0; i < results.length; i++) {

                        console.log(results[i]);
                        createMarker(results[i]);
                    }

                }
            }

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({ map: $window.map, position: placeLoc });
            }
        } else { ''; }

    });










}).controller('BuyCtrl', function($http) {
    // alert('abc');
    //    $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback').then(function(res) {
    //        console.log(res.data);
    //    }, function(err) {
    //        console.log(err);
    //    });


}).controller('TaxiCtrl', function() {

}).controller('EatCtrl', function() {

}).controller('DriveCtrl', function() {

});
