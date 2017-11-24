app.controller('LoginController',['$scope','$rootScope','loginService', '$window','$location', function($scope, $rootScope, loginService, $window,$location) {

	$scope.userLogin = function(user){
        return loginService.userLogin(user).then(function(response, status) {
        	if (response.status) {
                $rootScope.pageActive = true;
                $location.path("/campaign");

                $window.localStorage['accessToken']= response.data.accessToken;
                $window.localStorage['userId'] = response.data.user_id;
                $window.localStorage['email_id'] = response.data.email_id;
                $scope.currentUser = response.data.email_id;
        	}else if(response.code == 500){
        		swal('Connection error');
        	}else{
                swal('Invalid id & password..');
            }
        });
	};
    $rootScope.currentUserlogout = function(){
        $window.localStorage.clear();
        $location.path("/login");
        $rootScope.pageActive = false;
    };

}]);