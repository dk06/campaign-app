app.service('audienceService', function ($rootScope, $http, shareBaseUrl,$window) {
    var params = {};
    
    this.getAudienceSegement = function (chanelId) {
        params = shareBaseUrl.BaseUrl();
        params.channel_id = chanelId;
        var promise = $http.get(params.BaseUrl + 'getAudienceSegement', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.postAudienceSegement = function (params) {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        params.segment_type = params.segment_type;
        params.affinity_catagery = JSON.stringify(params.segementDatat.affinity_catagery);
        params.language = JSON.stringify(params.segementDatat.language);
        params.market_segment = JSON.stringify(params.segementDatat.market_segment);
        params.IAB = JSON.stringify(params.segementDatat.IAB);
        params.userId = params.acess.userId;
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
        params = shareBaseUrl.BaseUrl();
        var promise = $http.get(params.BaseUrl + 'getCustomSegmentsFields', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    //http://205.147.101.67:8080/marketingv1/getReach?siteId=&gender=1&agegroup=&incomelevel=&device=&city=&state=&country=&subcategory=
    this.getCustomReach = function(segementData){
        params = shareBaseUrl.BaseUrl();
        return $http.get(params.cuberootBaseUrl + 'getReach', {params : {siteId : '', gender : '2', agegroup : '' , incomelevel : '', device : '' ,city : '', state: '',country : '', subcategory: ''  }} ).then(function(response) {
                return response.data;
            });
    };

    //http://205.147.101.67:8080/marketingv1/getReach?siteId=1&gender=&agegroup=&incomelevel=&device=&city=&state=&country=&subcategory=
    this.getPrivateReach = function(){
        params = shareBaseUrl.BaseUrl();
        return $http.get(params.cuberootBaseUrl + 'getReach', {params : {siteId : '1', gender : '', agegroup : '' , incomelevel : '', device : '' ,city : '', state: '',country : '', subcategory: ''  }} ).then(function(response) {
                return response.data;
            });
    };

    //http://205.147.101.67:8080/marketingv1/getPrivateAudienceMarketplaceList
    this.getPrivateAudienceMarketplaceList = function(){
        params = shareBaseUrl.BaseUrl();
        return $http.get(params.cuberootBaseUrl + 'getPrivateAudienceMarketplaceList').then(function(response) {
                return response.data;
            });
    };

    this.getTargetingSummary = function(){
        params = shareBaseUrl.BaseUrl();
        return $http.get(params.cuberootBaseUrl + 'getTargetingSummary', {params: {siteId : '1'}}).then(function(response) {
                return response.data;
            });
    };

});