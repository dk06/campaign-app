app.service('campaignChanelService', function ($rootScope, $http, shareBaseUrl,$window) {
    var params = {};
    
    this.getChanel = function () {
        params = shareBaseUrl.BaseUrl();
        var promise = $http.get(params.BaseUrl + 'getCampaignChannel', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getChannelType = function () {
        params = shareBaseUrl.BaseUrl();
        var promise = $http.get(params.BaseUrl + 'getChannelTypeList', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getChannelData = function (campaignId, channelName) {        
        params = shareBaseUrl.BaseUrl();
        params.cuberootBaseUrl = "http://205.147.101.67:8080/dashboardAPIv2/report/";
        params.campaignId = campaignId;
        params.channelName = channelName;
        var promise = $http.get(params.BaseUrl + 'getChannelData', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.postCampaignChanel = function (params) {
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        params.userId = params.acess.userId;
        var promise = $http.post(params.acess.BaseUrl + 'addNewChannel', {params} ).then(function(response) {
                return response;
            });
            return promise;
        };
    this.editCampaignChenel = function(params){
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.post(params.acess.BaseUrl + 'editCampaignChannel', {params} ).then(function(response) {
                return response;
            });
            return promise;
        };

    this.deleteCampaignChenel = function(params){
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.post(params.acess.BaseUrl + 'deleteCampaignChannel', {params} ).then(function(response) {
                return response;
            });
            return promise;
        };
});