app.service('shareBaseUrl', function ($window) {

    return {
        BaseUrl: function () {
            var params = {};
                params.token = $window.localStorage.accessToken;
                params.userId = $window.localStorage.userId;
                params.BaseUrl = window.location.origin + /api/;
            return params;
        }
    };

});