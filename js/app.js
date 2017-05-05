angular.module('nowApp', ['ngRoute', 'nowCtrls']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/main.html',
        controller: 'NowCtrl'
    }).when('/pieszo', {
        templateUrl: 'partials/byfoot/profiles_byfoot.html'
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

    }).otherwise({ redirectTo: '/' });
}]);
