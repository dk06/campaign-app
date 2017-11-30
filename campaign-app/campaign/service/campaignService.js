app.service('campaignService', function ($rootScope, $http, shareBaseUrl,$window) {
    
   var params = {};
    
    this.getCategories = function () {
        params = shareBaseUrl.BaseUrl();
        var promise = $http.get(params.BaseUrl + 'getCampaign', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getDemographic = function () {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.get(params.acess.BaseUrl + 'getDemographic', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getTechnology = function () {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.get(params.acess.BaseUrl + 'getTechnology', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getDeviceModel = function () {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.get(params.acess.BaseUrl + 'getDeviceModel', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getCountry = function () {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.get(params.acess.BaseUrl + 'getCountry', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getState = function (countyCode) {
        params.acess = shareBaseUrl.BaseUrl();
        params.country_codes = countyCode;
        var promise = $http.get(params.acess.BaseUrl + 'getState', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getCity = function (stateCode) {
        params.acess = shareBaseUrl.BaseUrl();
        params.state_code = stateCode;
        var promise = $http.get(params.acess.BaseUrl + 'getCity', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };
});
