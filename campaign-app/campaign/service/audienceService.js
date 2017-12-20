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
        params.segment_type = params.segment_type;
        // params.age_type = JSON.stringify(params.segementDatat.age_type);
        // params.gender_type = JSON.stringify(params.segementDatat.gender_type);
        // params.affinity_catagery = JSON.stringify(params.segementDatat.affinity_catagery);
        // params.language = JSON.stringify(params.segementDatat.language);
        // params.market_segment = JSON.stringify(params.segementDatat.market_segment);
        // params.IAB = JSON.stringify(params.segementDatat.IAB);
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

    this.updateSegementType = function(updateSegment, segementId){
        params.acess = shareBaseUrl.BaseUrl();
        params.segment_type = updateSegment;
        params.segementId = segementId;
        var promise = $http.post(params.BaseUrl + 'updateSegementType', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    //http://205.147.101.67:8080/marketingv1/getReach?siteId=&gender=1&agegroup=&incomelevel=&device=&city=&state=&country=&subcategory=
    this.getCustomReach = function(segementData){
        params = shareBaseUrl.BaseUrl();
        return $http.get(params.cuberootBaseUrl + 'getReach', {params : {siteId : '1', gender : segementData.gender_type, agegroup : segementData.age_type , incomelevel : '', device : '' ,city : '', state: '',country : '', subcategory: ''  }} ).then(function(response) {
                return response.data;
            });
    };

    //http://205.147.101.67:8080/marketingv1/getReach?siteId=1&gender=&agegroup=&incomelevel=&device=&city=&state=&country=&subcategory=
    this.getPrivateReach = function(gender, ageId, incomeid){
        params = shareBaseUrl.BaseUrl();
        return $http.get(params.cuberootBaseUrl + 'getReach', {params : {siteId : '1', gender : gender, agegroup : ageId , incomelevel : incomeid, device : '' ,city : '', state: '',country : '', subcategory: ''  }} ).then(function(response) {
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
        var responseData = {
            TargetingSummary : '',
            PortedMarketCategories : '',
            PortedAffinityCategories : '',
            PortedIABCategories : ''
        };
        return $http.get(params.cuberootBaseUrl + 'getTargetingSummary', {params: {siteId : '1'}}).then(function(response) {
                responseData.TargetingSummary = response.data;
                return responseData;                
            });
    };

    this.getChannelPortedCategories = function(channel_type, categoryType, categoryList){
        params = shareBaseUrl.BaseUrl();
        return $http.get(params.cuberootBaseUrl + 'getChannelPortedCategories', {params: {source_channel : channel_type, target_channel : 'Lightning',categoryType : categoryType, categoryList : categoryList }}).then(function(response) {
            return response;
        });
    };

    //http://205.147.101.67:8080/marketingv1/getChannelPortedCategories?source_channel=Adwords&target_channel=Lightning&categoryType=market&categoryList=80439
    this.getCustomSegementChanges = function(segement_type, categoryType, seg_Id){
        params = shareBaseUrl.BaseUrl();
        return $http.get(params.cuberootBaseUrl + 'getChannelPortedCategories', {params: {source_channel : 'Lightning', target_channel : segement_type, categoryType : categoryType, categoryList : seg_Id }}).then(function(response) {
            return response.data;
        });
    };

});