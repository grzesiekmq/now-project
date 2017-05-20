angular.module('nowCtrls', []).controller('NowCtrl', function($http, $scope, $window) {
    var nc = this;

    $window.gmap = new google.maps.Map(document.getElementById('map'), {
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
    $window.gmap.addListener('click', function(event) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({ position: loc, map: $window.gmap, icon: './img/navigation.png', draggable: true });
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

            var svc = new google.maps.places.PlacesService($window.gmap);
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
                var marker = new google.maps.Marker({ map: $window.gmap, position: placeLoc });
            }
        }, function(dismiss) {
            if (dismiss === 'cancel') {
                '';
            }
        });

    });




}).controller('BuyCtrl', function($http, $window, $scope) {
    var bc = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var notify = {
        type: 'info',
        title: 'now! najbliższe sklepy',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;

    // click
    $window.gmap.addListener('click', function(event) {
        // current location
        var loc = event.latLng;

        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({ position: loc, map: $window.gmap, icon: './img/navigation.png', draggable: true });
        }


        document.getElementById('pop').play();

        console.log('pos:', loc.lat(), loc.lng());

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



            svc = new $window.google.maps.places.PlacesService($window.gmap);
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
                var marker = new google.maps.Marker({ map: $window.gmap, position: placeLoc });
            }
        }, function(dismiss) {
            if (dismiss === 'cancel') { ''; }
        });
    });







}).controller('TaxiCtrl', function($http, $scope, $window, PubNub, $rootScope) {
    var tc = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var notify = {
        type: 'info',
        title: 'now! postoje taxi',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;


    // click
    $window.gmap.addListener('click', function(event) {
        // current user location
        var loc = event.latLng;

        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({ position: loc, map: $window.gmap, icon: './img/navigation.png', draggable: true });
        }

        document.getElementById('pop').play();

        console.log('pos:', loc.lat(), loc.lng());


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
            var placeLoc;
            var taxiPos;

            var startPos = [50.06755, 19.94273];
            var speed = 50; // km/h

            var delay = 100;
            document.getElementById('detector').play();
            $scope.$emit('notify', notify);



            function animateMarker(marker, coords, km_h) {
                var target = 0;
                var km_h = km_h || 50;
                coords.push([startPos[0], startPos[1]]);

                function goToPoint() {
                    var lat = marker.position.lat();
                    var lng = marker.position.lng();
                    var step = (km_h * 1000 * delay) / 3600000; // in meters

                    var dest = new google.maps.LatLng(
                        coords[target][0], coords[target][1]);

                    var distance =
                        google.maps.geometry.spherical.computeDistanceBetween(
                            dest, marker.position); // in meters

                    var numStep = distance / step;
                    var i = 0;
                    var deltaLat = (coords[target][0] - lat) / numStep;
                    var deltaLng = (coords[target][1] - lng) / numStep;


                    if (!$rootScope.initialized) {

                        PubNub.init({
                            subscribe_key: 'sub-c-1ed69e9a-3748-11e7-9361-0619f8945a4f',
                            publish_key: 'pub-c-b7d1fd4a-2c18-4da4-98d3-989af3e6e5da',
                            ssl: (('https:' == document.location.protocol) ? true : false)


                        });
                        $rootScope.initialized = true;
                    }
                    PubNub.ngSubscribe({ channel: 'Channel-taxi' });

                    $scope.publish = setInterval(function() {
                        PubNub.ngPublish({
                            channel: 'Channel-taxi',
                            message: { latlng: [lat, lng] }
                        });
                    }, 1000);

                    $rootScope.$on(PubNub.ngMsgEv('Channel-taxi'), function(ngEvent, payload) {
                        $scope.$apply(function() {
                            taxiPos = new google.maps.LatLng(payload.message.latlng[0], payload.message.latlng[1]);
                            console.log(taxiPos.lat(), taxiPos.lng());
                            var svcDM = new google.maps.DistanceMatrixService;

                            svcDM.getDistanceMatrix({
                                origins: [loc],
                                destinations: [taxiPos],
                                travelMode: 'WALKING',
                                unitSystem: google.maps.UnitSystem.METRIC
                            }, function(response) {
                                $scope.nearTaxi = response.destinationAddresses["0"];
                                if (response.rows[0].elements[0].distance.value > 999) {
                                    $scope.dist = response.rows["0"].elements["0"].distance.text;
                                } else {
                                    $scope.dist = response.rows[0].elements[0].distance.value + 'm';
                                }
                                $scope.distVal = response.rows["0"].elements["0"].duration.text;
                                $scope.$apply();
                                console.log(response);
                            });
                        });
                    });





                    function moveMarker() {
                        lat += deltaLat;
                        lng += deltaLng;
                        i += step;

                        if (i < distance) {
                            marker.setPosition(new google.maps.LatLng(lat, lng));
                            setTimeout(moveMarker, delay);



                        } else {
                            marker.setPosition(dest);
                            target++;
                            if (target == coords.length) {
                                target = 0;
                            }

                            setTimeout(goToPoint, delay);
                        }
                    }
                    moveMarker();
                }
                goToPoint();
            }











            var taxi = new google.maps.Marker({ position: new google.maps.LatLng(startPos[0], startPos[1]), map: $window.gmap, icon: './img/taxicon.png' });
            var svc = new google.maps.places.PlacesService($window.gmap);
            svc.nearbySearch({ location: loc, radius: 1000, types: ['taxi_stand'] }, callback);

            var tLat = taxi.position.lat();
            var tLng = taxi.position.lng();



            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    console.log(results);
                    $scope.res = results;
                    $scope.$apply();

                    for (var i = 0; i < results.length; i++) {

                        createMarker(results[i]);
                    }



                } else { ''; }
            }


            function createMarker(place) {
                placeLoc = place.geometry.location;

                // taxi stand markers
                var marker = new google.maps.Marker({ map: $window.gmap, position: placeLoc });

            }

            google.maps.event.addListenerOnce($window.gmap, 'idle', function() {
                animateMarker(taxi, [
                    [
                        50.06755,
                        19.94273
                    ],

                    [50.06884,
                        19.93824
                    ],

                    [50.06712,
                        19.9388
                    ]




                ], speed);
            });






            console.log('t lat', taxi.position.lat());
            console.log('t lng', taxi.position.lng());



            var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap($window.gmap);

            var svcDi = new google.maps.DirectionsService;

            svcDi.route({
                    origin: loc,
                    destination: { lat: 50.06591539999999, lng: 19.939136899999994 },
                    travelMode: 'WALKING'
                },
                function(result) {
                    directionsDisplay.setDirections(result);

                    console.log(result);
                });


        }, function(dismiss) {
            if (dismiss === 'cancel') {
                '';
            }
        });
    });

}).controller('EatCtrl', function($http, $scope, $window) {
    var ec = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });
    var notify = {
        type: 'info',
        title: 'now! restauracje i bary',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;
    // click
    $window.gmap.addListener('click', function(event) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({ position: loc, map: $window.gmap, icon: './img/navigation.png', draggable: true });
        }


        document.getElementById('pop').play();

        console.log('pos:', loc.lat(), loc.lng());


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



            var svc = new google.maps.places.PlacesService($window.gmap);
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
                var marker = new google.maps.Marker({ map: $window.gmap, position: placeLoc });
            }
        }, function(dismiss) {
            if (dismiss === 'cancel') { ''; }
        });

    });

}).controller('ByFootCtrl', function($window) {
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0619625, lng: 19.9371255 },
        zoom: 18
    });

}).controller('DriveCtrl', function($http, $scope, $window, $rootScope) {
    var dc = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.04822, lng: 19.96863 },
        zoom: 18
    });
    var notify = {
        type: 'info',
        title: 'now! salony samochodowe',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;
    var btnLoad = document.getElementById('load');
    var btnDel = document.getElementById('del');
    btnLoad.addEventListener('click', function() {
        var car = localStorage.getItem('car');

        if (car) {
            $rootScope.carItem = JSON.parse(car);
            console.log($rootScope.carItem);
        } else {

            swal({
                title: 'brak samochodów na liście!',
                text: 'Określ aktualną lokalizację na mapie, lista zapisze się automatycznie :) dopiero później możesz wczytać',
                type: 'warning'
            });
        }


    }, function() { console.log('error'); });

    btnDel.addEventListener('click', function() {
        if (car) {
            swal({
                title: "Lista samochodów",
                text: "Czy napewno chcesz usunąć?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#00ff9f",
                cancelButtonColor: 'orangered',
                confirmButtonText: "Tak",
                cancelButtonText: "Nie",
                showLoaderOnConfirm: true
            }).then(function() {
                localStorage.clear();
                swal({
                    title: 'Usunięto listę',
                    type: 'success',
                    showConfirmButton: false
                });
                location.reload();

            }, function(dismiss) {
                if (dismiss === 'cancel') { ''; }
            });
        } else { ''; }
    });





    // click
    $window.gmap.addListener('click', function(event) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({ position: loc, map: $window.gmap, icon: './img/ferrari.png', draggable: true });
        }


        document.getElementById('pop').play();

        console.log('pos:', loc.lat(), loc.lng());


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

            var svc = new google.maps.places.PlacesService($window.gmap);
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
                var marker = new google.maps.Marker({ map: $window.gmap, position: placeLoc });
            }
            $http.get('cars.json').then(function(response) {
                $scope.cars = response.data.cars;
                console.log($scope.cars);
                var arr = [];
                for (var i = 0; i < $scope.cars.length; i++) {
                    var name = $scope.cars[i].name;
                    console.log(name);
                    arr.push(name);

                }
                console.log(arr);
                if (typeof(Storage) !== "undefined") {

                    localStorage.setItem('car', JSON.stringify(arr));
                }






            });


        }, function(dismiss) {
            if (dismiss === 'cancel') { ''; }
        });

    });








});
