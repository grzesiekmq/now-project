angular.module('nowCtrls', []).controller('NowCtrl', function($http, $scope, $window) {
    var nc = this;

    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var notify = {
        type: 'info',
        title: 'now! wszystkie miejsca',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;
    // click
    $window.map.addListener('click', function(event) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({ position: loc, map: $window.map, icon: './img/navigation.png', draggable: true });
        }


        document.getElementById('pop').play();
        console.log('pos:', loc.lat(), loc.lng());
        // confirm
        swal({
            title: "najbliższe miejsca",
            text: "Czy chcesz wyszukać najbliższe miejsca?",
            imageUrl: "https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/help_support_question_mark-256.png",
            showCancelButton: true,
            confirmButtonColor: "#00ff9f",
            cancelButtonColor: 'orangered',
            confirmButtonText: "Tak",
            cancelButtonText: "Nie",
            showLoaderOnConfirm: true
        }).then(function() {

            document.getElementById('detector').play();
            $scope.$emit('notify', notify);

            var svc = new google.maps.places.PlacesService($window.map);
            svc.nearbySearch({ location: loc, radius: 1000, types: ['grocery_or_supermarket', 'taxi_stand', 'food', 'car_dealer'] }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    $scope.res = results;
                    $scope.$apply();

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
        }, function(dismiss) {
            if (dismiss === 'cancel') {
                '';
            }
        });

    });




}).controller('BuyCtrl', function($http, $window, $scope) {
    var bc = this;
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var marker;

    // click
    $window.map.addListener('click', function(event) {
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
            document.getElementById('detector').play();

            alert('Znaleziono wszystkie najbliższe miejsca');


            svc = new $window.google.maps.places.PlacesService($window.map);
            svc.nearbySearch({ location: loc, radius: 1000, types: ['grocery_or_supermarket'] }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    console.log(results["0"].name);
                    $scope.res = results;
                    $scope.$apply();

                    for (var i = 0; i < results.length; i++) {



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







}).controller('TaxiCtrl', function($http, $scope, $window) {
    var tc = this;
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var marker;
    // click
    $window.map.addListener('click', function(event) {
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
            document.getElementById('detector').play();

            alert('Znaleziono wszystkie najbliższe miejsca');



            var svc = new google.maps.places.PlacesService($window.map);
            svc.nearbySearch({ location: loc, radius: 1000, types: ['taxi_stand'] }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    console.log(results);
                    $scope.res = results;
                    $scope.$apply();

                    for (var i = 0; i < results.length; i++) {

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

}).controller('EatCtrl', function($http, $scope, $window) {
    var ec = this;
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var marker;
    // click
    $window.map.addListener('click', function(event) {
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
            document.getElementById('detector').play();

            alert('Znaleziono wszystkie najbliższe miejsca');


            var svc = new google.maps.places.PlacesService($window.map);
            svc.nearbySearch({ location: loc, radius: 1000, types: ['bar'] }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    console.log(results);
                    $scope.res = results;
                    $scope.$apply();

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

}).controller('ByFootCtrl', function($window) {
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });

}).controller('DriveCtrl', function($http, $scope, $window) {
    var dc = this;
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var marker;
    // click
    $window.map.addListener('click', function(event) {
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
            svc.nearbySearch({ location: loc, radius: 1000, types: ['car_dealer'] }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    $scope.res = results;
                    $scope.$apply();
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

});
