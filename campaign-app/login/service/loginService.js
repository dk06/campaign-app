app.service('loginService', function ($rootScope, $http, shareBaseUrl) {
	var url = {};
    this.userLogin = function (params) {
    	params.acess = shareBaseUrl.BaseUrl();
    	params = params;
        var promise = $http.post(params.acess.BaseUrl + 'login' ,  {params}).then(function(response) {
                return response.data;
            });
            return promise;
    };

});
