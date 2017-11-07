app.service('audienceService', function ($rootScope, $http, shareBaseUrl,$window) {
    var params = {};
    
    this.getAudienceSegement = function () {
        params = shareBaseUrl.BaseUrl();
        var promise = $http.get(params.BaseUrl + 'getAudienceSegement', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.postAudienceSegement = function (params) {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.post(params.acess.BaseUrl + 'audienceSegement', {params} ).then(function(response) {
                return response;
            });
            return promise;
        };
    this.editAudienceSegement = function(params){
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.post(params.acess.BaseUrl + 'editAudienceSegement', {params} ).then(function(response) {
                return response;
            });
            return promise;
        };

    this.deleteAudienceSegement = function(params){
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.post(params.acess.BaseUrl + 'deleteAudienceSegement', {params} ).then(function(response) {
                return response;
            });
            return promise;
        };

    this.getCustomSegmentsFields = function(){
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.get(params.acess.BaseUrl + 'getCustomSegmentsFields', {params} ).then(function(response) {
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

    this.getBehaviour = function () {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        params.segment_id = 1;
        var promise = $http.get(params.acess.BaseUrl + 'getBehaviour', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getLocation = function () {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.get(params.acess.BaseUrl + 'getLocation', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };
});