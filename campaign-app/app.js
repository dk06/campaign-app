var app = angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap','ngCsv']);

   app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

	    $routeProvider	  
		  .when('/login', {
		    templateUrl: 'login/views/login.html',
		    controller: 'LoginController'
		  })
		  .when('/campaign', {
		    templateUrl: 'campaign/views/campaign.html',
		    controller: 'compaignChanelController'
		  })
          .when('/new_campaign', {
            templateUrl: 'campaign/views/dashboard.html',
            controller: 'CampaignController'
          })
		  .otherwise({
		    redirectTo: '/login'
		  });
  }]).run(function ($rootScope, $location, $window, loaderEvent) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        var allowedView = ["/login"];
        var currentUrl = window.location.href;
        var split_url = currentUrl.split('/');
        if ($window.localStorage.accessToken)
        {
        	$rootScope.pageActive = true;
        	$rootScope.currentUser = $window.localStorage.email_id;
            if (split_url[3] == "login" || split_url[3] == "") {
                $location.path("/campaign");
                loaderEvent.loaderActivate();
            }
        } 
        else{
            $location.path("/login");
        }
    });
});

//angular.module('MyApp').constant('BaseURL', 'http://localhost:8081/api/');


