angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

		// home page
		.when('/', {
		    templateUrl: 'views/home.html',
		    controller: 'MainController'
		})

		.when('/map', {
		    templateUrl: 'views/nerd.html',
		    controller: 'NerdController'
		})

        .when('/zone', {
            templateUrl: 'views/zone.html',
            controller: 'ZoneController'
        })

		.when('/jag', {
		    templateUrl: 'views/geek.html',
		    controller: 'GeekController'
		});

    $locationProvider.html5Mode(true);

}]);