app.service('shareBaseUrl', function ($window) {

    return {
        BaseUrl: function () {
            var params = {};
                params.token = $window.localStorage.accessToken;
                params.userId = $window.localStorage.userId;
                params.BaseUrl = window.location.origin + /api/;
                params.cuberootBaseUrl = "http://205.147.101.67:8080/marketingv1/";
            return params;
        }
    };

});