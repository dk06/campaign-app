var app = angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap']);

   app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

	    $routeProvider	  
		  .when('/login', {
		    templateUrl: 'login/views/login.html',
		    controller: 'LoginController'
		  })
		  .when('/campaign', {
		    templateUrl: 'campaign/views/dashboard.html',
		    controller: 'CampaignController'
		  })
		  .otherwise({
		    redirectTo: '/login'
		  });
  }]).run(function ($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        var allowedView = ["/login"];

        if ($window.localStorage.accessToken)
        {
        	$rootScope.pageActive = true;
        	$rootScope.currentUser = $window.localStorage.email_id;
           	$location.path("/campaign");
        } 
        else
        {
			$location.path("/login");
        }


    });
});

//angular.module('MyApp').constant('BaseURL', 'http://localhost:8081/api/');