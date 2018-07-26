angular.module('nowCtrls', []).controller('NowCtrl', function ($http, $scope, $window) {
    var nc = this;

    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.0619625,
            lng: 19.9371255
        },
        zoom: 18
    });

    document.getElementById("map_title").innerHTML = "Wskaż swoją pozycje na mapie: ";
    document.getElementById("map_panel").className = "panel panel-default";

    var notify = {
        type: 'info',
        title: 'now! wszystkie miejsca',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };

    var marker;
    var infowindow;
    var activeWindow;
    // click
    $window.gmap.addListener('click', function (event) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({
                position: loc,
                map: $window.gmap,
                icon: './img/navigation.png',
                draggable: true
            });
        }

        document.getElementById('pop').play();
        console.log('pos:', loc.lat(), loc.lng());
        console.log(loc);

        var retrievedObject = localStorage.getItem('geoHistory');
        locationTab = JSON.parse(retrievedObject);

        if (locationTab == null) {
            var newLocationTab = [];
            newLocationTab[0] = [loc.lat(), loc.lng()];
            localStorage.setItem('geoHistory', JSON.stringify(newLocationTab));
        } else {
            locationTab[locationTab.length] = [loc.lat(), loc.lng()];
            localStorage.setItem('geoHistory', JSON.stringify(locationTab));
        }

        var ro = localStorage.getItem('geoHistory');
        lt2 = JSON.parse(ro);
        console.log(lt2);

        // confirm
        var c = confirm("Czy chcesz wyszukać wszystkie najbliższe miejsca?");
        if (c) {
            /* swal({
            title: "Najbliższe miejsca",
            text: "Czy chcesz wyszukać wszystkie najbliższe miejsca?",
            imageUrl: "https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/help_support_question_mark-256.png",
            showCancelButton: true,
            confirmButtonColor: "#00ff9f",
            cancelButtonColor: 'orangered',
            confirmButtonText: "Tak",
            cancelButtonText: "Nie",
            showLoaderOnConfirm: true
       */
            //}).then(function() {

            document.getElementById('detector').play();
            $scope.$emit('notify', notify);

            var svc = new google.maps.places.PlacesService($window.gmap);
            svc.nearbySearch({
                location: loc,
                radius: 1000,
                types: ['grocery_or_supermarket', 'taxi_stand', 'food', 'car_dealer']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    $scope.res = results;
                    $scope.loc = loc;
                    var url = [];

                    for (var i = 0; i < results.length; i++) {

                        var new_name = results[i].name.replace(/ /g, "+");
                        url[i] = 'https://www.google.com/maps/place/' + new_name + '/@' + results[i].geometry.location.toUrlValue() + ',' + 17 + 'z/';
                        createMarker(results[i], url[i]);

                        console.log(results[i]);
                        // createMarker(results[i], results[i].name, results[i].vicinity);
                    }
                    $scope.url = url;
                    $scope.$apply();
                }
            }

            function createMarker(place, link) {
                var placeLoc = place.geometry.location;
                var placeName = place.name;
                var marker = new google.maps.Marker({
                    map: $window.gmap,
                    position: placeLoc,
                    title: placeName,
                    url: link,
                });
                google.maps.event.addListener(marker, 'click', function () {
                    window.open(marker.url, '_blank');
                });

            }

            // });
        } else {
            '';
        }
    });

}).controller('BuyCtrl', function ($http, $window, $scope) {
    var bc = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.0619625,
            lng: 19.9371255
        },
        zoom: 18
    });
    document.getElementById("map_title").innerHTML = "Wskaż swoją pozycje na mapie: ";
    document.getElementById("map_panel").className = "panel panel-default";
    var notify = {
        type: 'info',
        title: 'now! najbliższe sklepy',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;
    var infowindow;

    var activeWindow;

    // click
    $window.gmap.addListener('click', function (event) {
        // current location
        var loc = event.latLng;

        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({
                position: loc,
                map: $window.gmap,
                icon: './img/navigation.png',
                draggable: true
            });
        }

        document.getElementById('pop').play();

        console.log('pos:', loc.lat(), loc.lng());

        var retrievedObject = localStorage.getItem('geoHistory');
        locationTab = JSON.parse(retrievedObject);
        if (locationTab == null) {
            var newLocationTab = [];
            newLocationTab[0] = [loc.lat(), loc.lng()];
            localStorage.setItem('geoHistory', JSON.stringify(newLocationTab));
        } else {
            locationTab[locationTab.length] = [loc.lat(), loc.lng()];
            localStorage.setItem('geoHistory', JSON.stringify(locationTab));
        }

        var ro = localStorage.getItem('geoHistory');
        lt2 = JSON.parse(ro);
        console.log(lt2);
        var c = confirm("Czy chcesz wyszukać wszystkie najbliższe miejsca?");
        if (c) {
            /* swal({
                 title: "najbliższe miejsca",
                 text: "Czy chcesz wyszukać najbliższe miejsca?",
                 imageUrl: "https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/help_support_question_mark-256.png",
                 showCancelButton: true,
                 confirmButtonColor: "#00ff9f",
                 cancelButtonColor: 'orangered',
                 confirmButtonText: "Tak",
                 cancelButtonText: "Nie",
                 showLoaderOnConfirm: true
            */
            //}).then(function() {
            document.getElementById('detector').play();
            $scope.$emit('notify', notify);

            svc = new $window.google.maps.places.PlacesService($window.gmap);
            svc.nearbySearch({
                location: loc,
                radius: 1000,
                types: ['grocery_or_supermarket']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);

                    //console.log(results["0"]);
                    console.log(results);

                    console.log(results["0"].name);

                    $scope.res = results;

                    var url = [];

                    for (var i = 0; i < results.length; i++) {

                        //console.log(i);
                        //console.log(results[i].name);
                        //console.log(results[i].geometry.location.toUrlValue());
                        var new_name = results[i].name.replace(/ /g, "+");
                        url[i] = 'https://www.google.com/maps/place/' + new_name + '/@' + results[i].geometry.location.toUrlValue() + ',' + 17 + 'z/';
                        createMarker(results[i], url[i]);

                        // createMarker(results[i], results[i].name, results[i].vicinity);

                    }
                    $scope.loc = loc;
                    $scope.url = url;
                    $scope.$apply();
                    //console.log(url);

                }
            }

            function createMarker(place, link) {
                var placeLoc = place.geometry.location;
                var placeName = place.name;
                var marker = new google.maps.Marker({
                    map: $window.gmap,
                    position: placeLoc,
                    title: placeName,
                    url: link,
                });
                google.maps.event.addListener(marker, 'click', function () {
                    window.open(marker.url, '_blank');
                });

            }

            //     });

        } else {
            '';
        }

    });

}).controller('TaxiCtrl', function ($http, $scope, $window, PubNub, $rootScope) {
    var tc = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.0619625,
            lng: 19.9371255
        },
        zoom: 18
    });
    document.getElementById("map_title").innerHTML = "Wskaż swoją pozycje na mapie: ";
    document.getElementById("map_panel").className = "panel panel-default";
    var notify = {
        type: 'info',
        title: 'now! postoje taxi',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;
    var infowindow;

    var activeWindow;

    // click
    $window.gmap.addListener('click', function (event) {
        // current user location
        var loc = event.latLng;

        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({
                position: loc,
                map: $window.gmap,
                icon: './img/navigation.png',
                draggable: true
            });
        }

        document.getElementById('pop').play();

        console.log('pos:', loc.lat(), loc.lng());
        var retrievedObject = localStorage.getItem('geoHistory');
        locationTab = JSON.parse(retrievedObject);
        if (locationTab == null) {
            var newLocationTab = [];
            newLocationTab[0] = [loc.lat(), loc.lng()];
            localStorage.setItem('geoHistory', JSON.stringify(newLocationTab));
        } else {

            locationTab[locationTab.length] = [loc.lat(), loc.lng()];

            localStorage.setItem('geoHistory', JSON.stringify(locationTab));
        }

        var ro = localStorage.getItem('geoHistory');
        lt2 = JSON.parse(ro);
        console.log(lt2);
        var c = confirm("Czy chcesz wyszukać wszystkie najbliższe miejsca?");
        if (c) {
            /* swal({
                 title: "najbliższe miejsca",
                 text: "Czy chcesz wyszukać najbliższe miejsca?",
                 imageUrl: "https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/help_support_question_mark-256.png",
                 showCancelButton: true,
                 confirmButtonColor: "#00ff9f",
                 cancelButtonColor: 'orangered',
                 confirmButtonText: "Tak",
                 cancelButtonText: "Nie",
                 showLoaderOnConfirm: true
            */
            // }).then(function() {
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
                    PubNub.ngSubscribe({
                        channel: 'Channel-taxi'
                    });

                    $scope.publish = setInterval(function () {
                        PubNub.ngPublish({
                            channel: 'Channel-taxi',
                            message: {
                                latlng: [lat, lng]
                            }
                        });
                    }, 1000);

                    $rootScope.$on(PubNub.ngMsgEv('Channel-taxi'), function (ngEvent, payload) {
                        $scope.$apply(function () {
                            taxiPos = new google.maps.LatLng(payload.message.latlng[0], payload.message.latlng[1]);
                            console.log(taxiPos.lat(), taxiPos.lng());
                            var svcDM = new google.maps.DistanceMatrixService;

                            svcDM.getDistanceMatrix({
                                origins: [loc],
                                destinations: [taxiPos],
                                travelMode: 'WALKING',
                                unitSystem: google.maps.UnitSystem.METRIC
                            }, function (response) {
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

            var taxi = new google.maps.Marker({
                position: new google.maps.LatLng(startPos[0], startPos[1]),
                map: $window.gmap,
                icon: './img/taxicon.png'
            });
            var svc = new google.maps.places.PlacesService($window.gmap);
            svc.nearbySearch({
                location: loc,
                radius: 1000,
                types: ['taxi_stand']
            }, callback);

            var tLat = taxi.position.lat();
            var tLng = taxi.position.lng();

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    console.log(results);
                    $scope.res = results;

                    var url = [];

                    for (var i = 0; i < results.length; i++) {

                        var new_name = results[i].name.replace(/ /g, "+");
                        url[i] = 'https://www.google.com/maps/place/' + new_name + '/@' + results[i].geometry.location.toUrlValue() + ',' + 17 + 'z/';
                        createMarker(results[i], url[i]);

                        // createMarker(results[i], results[i].name, results[i].vicinity);

                    }
                    $scope.url = url;
                    $scope.loc = loc;
                    $scope.$apply();

                } else {
                    '';
                }
            }

            function createMarker(place, link) {
                var placeLoc = place.geometry.location;
                var placeName = place.name;
                var marker = new google.maps.Marker({
                    map: $window.gmap,
                    position: placeLoc,
                    title: placeName,
                    url: link,
                });
                google.maps.event.addListener(marker, 'click', function () {
                    window.open(marker.url, '_blank');
                });

            }

            google.maps.event.addListenerOnce($window.gmap, 'idle', function () {
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

            //     });
        } else {
            '';
        }
    });

}).controller('EatCtrl', function ($http, $scope, $window) {
    var ec = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.0619625,
            lng: 19.9371255
        },
        zoom: 18
    });
    document.getElementById("map_title").innerHTML = "Wskaż swoją pozycje na mapie: ";
    document.getElementById("map_panel").className = "panel panel-default";
    var notify = {
        type: 'info',
        title: 'now! restauracje i bary',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;
    var infowindow;

    var activeWindow;

    // click
    $window.gmap.addListener('click', function (event) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({
                position: loc,
                map: $window.gmap,
                icon: './img/navigation.png',
                draggable: true
            });
        }

        document.getElementById('pop').play();

        console.log('posx:', loc.lat(), loc.lng());

        var retrievedObject = localStorage.getItem('geoHistory');
        locationTab = JSON.parse(retrievedObject);
        if (locationTab == null) {
            var newLocationTab = [];
            newLocationTab[0] = [loc.lat(), loc.lng()];
            localStorage.setItem('geoHistory', JSON.stringify(newLocationTab));
        } else {

            locationTab[locationTab.length] = [loc.lat(), loc.lng()];

            localStorage.setItem('geoHistory', JSON.stringify(locationTab));
        }

        var ro = localStorage.getItem('geoHistory');
        lt2 = JSON.parse(ro);
        console.log(lt2);
        var c = confirm("Czy chcesz wyszukać wszystkie najbliższe miejsca?");
        if (c) {
            /*  swal({
            title: "najbliższe miejsca",
            text: "Czy chcesz wyszukać najbliższe miejsca?",
            imageUrl: "https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/help_support_question_mark-256.png",
            showCancelButton: true,
            confirmButtonColor: "#00ff9f",
            cancelButtonColor: 'orangered',
            confirmButtonText: "Tak",
            cancelButtonText: "Nie",
            showLoaderOnConfirm: true
    */
            // 	}).then(function() {
            document.getElementById('detector').play();
            $scope.$emit('notify', notify);

            var svc = new google.maps.places.PlacesService($window.gmap);
            svc.nearbySearch({
                location: loc,
                radius: 1000,
                types: ['bar']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    console.log(results);
                    $scope.res = results;

                    var url = [];

                    for (var i = 0; i < results.length; i++) {

                        var new_name = results[i].name.replace(/ /g, "+");
                        url[i] = 'https://www.google.com/maps/place/' + new_name + '/@' + results[i].geometry.location.toUrlValue() + ',' + 17 + 'z/';
                        createMarker(results[i], url[i]);

                        // console.log(results[i]);
                        // createMarker(results[i], results[i].name, results[i].vicinity);

                    }
                    $scope.url = url;
                    $scope.loc = loc;
                    $scope.$apply();

                }
            }

            function createMarker(place, link) {
                var placeLoc = place.geometry.location;
                var placeName = place.name;
                var marker = new google.maps.Marker({
                    map: $window.gmap,
                    position: placeLoc,
                    title: placeName,
                    url: link,
                });
                google.maps.event.addListener(marker, 'click', function () {
                    window.open(marker.url, '_blank');
                });

            }

            //     });
        } else {
            '';
        }
    });

}).controller('GasCtrl', function ($http, $scope, $window) {
    var ec = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.0619625,
            lng: 19.9371255
        },
        zoom: 18
    });
    document.getElementById("map_title").innerHTML = "Wskaż swoją pozycje na mapie: ";
    document.getElementById("map_panel").className = "panel panel-default";
    var notify = {
        type: 'info',
        title: 'now! stacja paliw',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;
    var infowindow;

    var activeWindow;

    // click
    $window.gmap.addListener('click', function (event) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({
                position: loc,
                map: $window.gmap,
                icon: './img/navigation.png',
                draggable: true
            });
        }

        document.getElementById('pop').play();

        console.log('posx:', loc.lat(), loc.lng());

        var retrievedObject = localStorage.getItem('geoHistory');
        locationTab = JSON.parse(retrievedObject);
        if (locationTab == null) {
            var newLocationTab = [];
            newLocationTab[0] = [loc.lat(), loc.lng()];
            localStorage.setItem('geoHistory', JSON.stringify(newLocationTab));
        } else {

            locationTab[locationTab.length] = [loc.lat(), loc.lng()];

            localStorage.setItem('geoHistory', JSON.stringify(locationTab));
        }

        var ro = localStorage.getItem('geoHistory');
        lt2 = JSON.parse(ro);
        console.log(lt2);
        var c = confirm("Czy chcesz wyszukać wszystkie najbliższe miejsca?");
        if (c) {
            /* swal({
            title: "najbliższe miejsca",
            text: "Czy chcesz wyszukać najbliższe miejsca?",
            imageUrl: "https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/help_support_question_mark-256.png",
            showCancelButton: true,
            confirmButtonColor: "#00ff9f",
            cancelButtonColor: 'orangered',
            confirmButtonText: "Tak",
            cancelButtonText: "Nie",
            showLoaderOnConfirm: true
      */
            // 	}).then(function() {
            document.getElementById('detector').play();
            $scope.$emit('notify', notify);

            var svc = new google.maps.places.PlacesService($window.gmap);
            svc.nearbySearch({
                location: loc,
                radius: 1000,
                types: ['gas_station']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    console.log(results);
                    $scope.res = results;

                    var url = [];

                    for (var i = 0; i < results.length; i++) {

                        var new_name = results[i].name.replace(/ /g, "+");
                        url[i] = 'https://www.google.com/maps/place/' + new_name + '/@' + results[i].geometry.location.toUrlValue() + ',' + 17 + 'z/';
                        createMarker(results[i], url[i]);

                        // console.log(results[i]);
                        // createMarker(results[i], results[i].name, results[i].vicinity);

                    }
                    $scope.url = url;
                    $scope.loc = loc;
                    $scope.$apply();

                }
            }

            function createMarker(place, link) {
                var placeLoc = place.geometry.location;
                var placeName = place.name;
                var marker = new google.maps.Marker({
                    map: $window.gmap,
                    position: placeLoc,
                    title: placeName,
                    url: link,
                });
                google.maps.event.addListener(marker, 'click', function () {
                    window.location.href = marker.url;
                });

            }

            //     });
        } else {
            '';
        }
    });

}).controller('DetailsCtrl', function ($http, $scope, $routeParams, $window) {
    $scope.origin_lat = $routeParams.origin_lat;
    $scope.origin_lng = $routeParams.origin_lng;
    $scope.dest_lat = $routeParams.dest_lat;
    $scope.dest_lng = $routeParams.dest_lng;
    $scope.target = $routeParams.target;

    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.0619625,
            lng: 19.9371255
        },
        zoom: 18
    });
    document.getElementById("map_title").innerHTML = "Trasa do wybranego celu: ";

    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap($window.gmap);

    var svcDi = new google.maps.DirectionsService;
    var originLoc = new google.maps.LatLng($scope.origin_lat, $scope.origin_lng);

    var destLoc = new google.maps.LatLng($scope.dest_lat, $scope.dest_lng);
    svcDi.route({
        origin: originLoc,
        destination: destLoc,
        travelMode: 'WALKING'
    },
        function (result) {
            directionsDisplay.setDirections(result);

            console.log(result);
        });

    var svcDM = new google.maps.DistanceMatrixService;

    svcDM.getDistanceMatrix({
        origins: [originLoc],
        destinations: [destLoc],
        travelMode: 'WALKING',
        unitSystem: google.maps.UnitSystem.METRIC
    }, function (response) {
        $scope.nearTaxi = response.destinationAddresses["0"];
        if (response.rows[0].elements[0].distance.value > 999) {
            $scope.dist = response.rows["0"].elements["0"].distance.text;
        } else {
            $scope.dist = response.rows[0].elements[0].distance.value + 'm';
        }
        $scope.distVal = response.rows["0"].elements["0"].duration.text;
        $scope.$apply();

    });

}).controller('ByFootCtrl', function ($window) {
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.0619625,
            lng: 19.9371255
        },
        zoom: 18
    });

}).controller('HistoryCtrl', function ($window, $scope) {

    document.getElementById("map_panel").className = "hidden";
    var retrievedObject = localStorage.getItem('geoHistory');
    locationTab = JSON.parse(retrievedObject);
    $scope.history = locationTab;
    console.log(locationTab);
    document.getElementById("brak").className = "panel panel-default";

}).controller('DeleteCtrl', function ($window, $scope) {
    localStorage.removeItem('geoHistory');
    document.getElementById("brak").className = "panel panel-default";
    document.getElementById("map_panel").className = "hidden";

}).controller('AboutCtrl', function ($window, $scope) {
    document.getElementById("map_panel").className = "hidden";

}).controller('DriveCtrl', function ($http, $scope, $window, $rootScope) {
    var dc = this;
    $window.gmap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.04822,
            lng: 19.96863
        },
        zoom: 18
    });
    var notify = {
        type: 'info',
        title: 'now! salony samochodowe',
        content: 'Znaleziono wszystkie najbliższe miejsca',
        timeout: 10000 //time in ms
    };
    var marker;
    var infowindow;

    var activeWindow;

    var btnLoad = document.getElementById('load');
    var btnDel = document.getElementById('del');
    btnLoad.addEventListener('click', function () {
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

    }, function () {
        console.log('error');
    });

    /* btnDel.addEventListener('click', function() {
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

        } else { ''; }
    });
*/

    // click
    $window.gmap.addListener('click', function (event) {
        // current location
        var loc = event.latLng;
        if (marker != undefined) {
            marker.setPosition(loc);
        } else {

            marker = new google.maps.Marker({
                position: loc,
                map: $window.gmap,
                icon: './img/ferrari.png',
                draggable: true
            });
        }

        document.getElementById('pop').play();

        console.log('pos:', loc.lat(), loc.lng());

        var c = confirm("Czy chcesz wyszukać wszystkie najbliższe miejsca?");
        if (c) {
            /* swal({
                 title: "najbliższe miejsca",
                 text: "Czy chcesz wyszukać najbliższe miejsca?",
                 imageUrl: "https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/help_support_question_mark-256.png",
                 showCancelButton: true,
                 confirmButtonColor: "#00ff9f",
                 cancelButtonColor: 'orangered',
                 confirmButtonText: "Tak",
                 cancelButtonText: "Nie",
                 showLoaderOnConfirm: true
            */
            // 	}).then(function() {
            document.getElementById('detector').play();

            $scope.$emit('notify', notify);

            var svc = new google.maps.places.PlacesService($window.gmap);
            svc.nearbySearch({
                location: loc,
                radius: 1000,
                types: ['car_dealer']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('length', results.length);
                    $scope.res = results;
                    var url = [];

                    for (var i = 0; i < results.length; i++) {

                        var new_name = results[i].name.replace(/ /g, "+");
                        url[i] = 'https://www.google.com/maps/place/' + new_name + '/@' + results[i].geometry.location.toUrlValue() + ',' + 17 + 'z/';
                        createMarker(results[i], url[i]);

                        // console.log(results[i]);
                        // createMarker(results[i], results[i].name, results[i].vicinity);

                    }
                    $scope.url = url;
                    $scope.$apply();

                }
            }

            function createMarker(place, link) {
                var placeLoc = place.geometry.location;
                var placeName = place.name;
                var marker = new google.maps.Marker({
                    map: $window.gmap,
                    position: placeLoc,
                    title: placeName,
                    url: link,
                });
                google.maps.event.addListener(marker, 'click', function () {
                    window.open(marker.url, '_blank');
                });

            }
            $http.get('cars.json').then(function (response) {
                $scope.cars = response.data.cars;
                console.log($scope.cars);
                var arr = [];
                for (var i = 0; i < $scope.cars.length; i++) {
                    var name = $scope.cars[i].name;
                    console.log(name);
                    arr.push(name);

                }
                console.log(arr);
                if (typeof (Storage) !== "undefined") {

                    localStorage.setItem('car', JSON.stringify(arr));
                }

            });

            //     });

        } else {
            '';
        }

    });
});
