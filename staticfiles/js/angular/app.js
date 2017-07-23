/**
 * Created by savad on 23/7/17.
 */
'use strict';
var app = angular.module('apvera', ['ngRoute', 'ngStorage']);

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

//cors config
app.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/static/templates/profile.html',
			controller: 'ApveraController'
		})
		.when('/change-password/', {
			templateUrl: '/static/templates/change_password.html',
			controller: 'ApveraController'
		})
        .when('/login/', {
			templateUrl: '/static/templates/login.html',
			controller: 'ApveraController'
		})
        .when('/activate/:uid/:token/', {
			templateUrl: '/static/templates/activate.html',
			controller: 'ApveraController'
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.run(['$rootScope', '$location', '$localStorage', function($rootScope, $location, $localStorage) {
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        var logged = $localStorage.token;

        var restrictedPage = $.inArray($location.path(), ['/login/']) === -1;

        if(restrictedPage && !logged && !$location.path().startsWith("/activate/")) {
            event.preventDefault();
            $location.path('/login/');
        }
    });
}]);