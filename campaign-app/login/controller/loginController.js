app.controller('LoginController',['$scope','$rootScope','loginService', '$window','$location', function($scope, $rootScope, loginService, $window,$location) {

	$scope.userLogin = function(user){
        return loginService.userLogin(user).then(function(response, status) {
        	if (response.status) {
                $location.path("/campaign");

                $window.localStorage['accessToken']= response.data.accessToken;
                $window.localStorage['userId'] = response.data.user_id;
                $rootScope.currentUser = response.data;
        	}else{
        		alert('Invalid id..');
        	}
        });
	};
    $rootScope.logout = function(){
        $window.localStorage.clear();
        $location.path("/login");
        $rootScope.currentUser = false;
    };

}]);