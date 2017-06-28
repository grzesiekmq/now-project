angular.module('nowApp', ['ngRoute', 'ngAnimate', 'angularNotify', 'oitozero.ngSweetAlert', '19degrees.ngSweetAlert2', 'pubnub.angular.service', 'nowCtrls']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/main.html',
        controller: 'NowCtrl'
    }).when('/pieszo', {
        templateUrl: 'partials/byfoot/profiles_byfoot.html',
        controller: 'ByFootCtrl'
    }).when('/buy', {
        templateUrl: 'partials/byfoot/buy.html',
        controller: 'BuyCtrl'
    }).when('/taxi', {
        templateUrl: 'partials/byfoot/taxi.html',
        controller: 'TaxiCtrl'
    }).when('/eat', {
        templateUrl: 'partials/byfoot/eat.html',
        controller: 'EatCtrl'

    }).when('/drive', {
        templateUrl: 'partials/drive/driver.html',
        controller: 'DriveCtrl'

    }).when('/list', {
        templateUrl: 'partials/drive/carlist.html',
        controller: 'DriveCtrl'
    }).otherwise({ redirectTo: '/' });
}]);
