app.service('shareBaseUrl', function ($window) {

    return {
        BaseUrl: function () {
            var params = {};
                params.token = $window.localStorage.accessToken;
                params.userId = $window.localStorage.userId;

                var httpAddress = window.location.origin;
                var split_data = httpAddress.split('/');
                if (split_data[0] == "https:") {
                    params.BaseUrl = "http://" + split_data[2]+ "/api/";
                }else{
                    params.BaseUrl = window.location.origin + /api/;
                }
                params.cuberootBaseUrl = "http://205.147.101.67:8080/marketingv1/";
                params.cuberootMarketBaseUrl = "http://205.147.101.67:8080/marketingreports/report/";
                params.cuberootMarketIdealParamBaseUrl = "http://205.147.101.67:8080/marketingIdealParam/report/idealtargetingparams/";
            return params;
        }
    };

});