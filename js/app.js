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
		 }).when('/history', {
        templateUrl: 'partials/history.html',
        controller: 'HistoryCtrl'
		}).when('/delete_history', {
        templateUrl: 'partials/history.html',
        controller: 'DeleteCtrl'
			}).when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
			}).when('/gas', {
        templateUrl: 'partials/gas.html',
        controller: 'GasCtrl'
		
	}).when('/details/:origin_lat/:origin_lng/:dest_lat/:dest_lng/:target', {
        templateUrl:'partials/details.html',
        controller:'DetailsCtrl'

 


    }).when('/drive', {
        templateUrl: 'partials/drive/driver.html',
        controller: 'DriveCtrl'

    }).when('/list', {
        templateUrl: 'partials/drive/carlist.html',
        controller: 'DriveCtrl'
    }).otherwise({ redirectTo: '/' });
}]);
