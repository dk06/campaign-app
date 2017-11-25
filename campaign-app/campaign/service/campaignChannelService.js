app.service('campaignChannelService', function ($rootScope, $http, shareBaseUrl,$window) {
    var params = {};
    
    this.getChanel = function () {
        params = shareBaseUrl.BaseUrl();
        var promise = $http.get(params.BaseUrl + 'getCampaignChannel', {params} ).then(function(response) {
                return response.data;
            });
            return promise;
        };

    this.getViewChanel = function (paramsObj) {
        params = shareBaseUrl.BaseUrl();
        params.id = paramsObj
        var promise = $http.get(params.BaseUrl + 'getViewCampaignChannel', {params} ).then(function(response) {
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

    //start channal section create 

        var responseData = {
            campaignId : '',
            scriptTag : '',
            campaignChannelData : '',
            channelName : '',
            channelAccessToken : '',
            editChanelId : ''
        }

    this.getChannelData = function (paramsObj) {
        //params = shareBaseUrl.BaseUrl();
        responseData.channelName = paramsObj.channelName;
        responseData.channelAccessToken = paramsObj.channelAccessToken;
        responseData.editChanelId = paramsObj.editChanelId;
        //http://205.147.101.67:8080/marketingv1/getChannelCampaignId?channel_type=facebook&access_token=aaasssdff
        var promise = $http.get('http://205.147.101.67:8080/marketingv1/getChannelCampaignId?', { params: {channel_type : paramsObj.channelName, access_token : paramsObj.channelAccessToken }} ).then(function(response) {
                responseData.campaignId = response.data;
                // if (response.data.campaignId != null) {
                //     return getdmpTag().then(function(response){
                //         responseData.scriptTag = response;
                //             return getCampaignChannelDetails(paramsObj).then(function(response){
                //                 responseData.campaignChannelData = response;
                //                 return responseData;
                //         });                
                //     });
                // }else{
                //     return responseData;
                // }
                
            });
            return promise;
        };

        //http://205.147.101.67:8080/marketingv1/getdmpTag?campaign_id=61001
        getdmpTag =function(){
            return $http.get(params.cuberootBaseUrl + 'getdmpTag', {params : {campaign_id : responseData.campaignId }} ).then(function(response) {
                return response.data;
            });
        };

        getCampaignChannelDetails = function(paramsObj) {
            return $http.get(params.cuberootBaseUrl + 'campaignChannelDetails', {params : {campaign_id : responseData.campaignId, channel_type : paramsObj.channelName, access_token : paramsObj.channelAccessToken }} ).then(function(response) {
                var channelList = response.data
                if (responseData.editChanelId) {
                    return chennelDetailsUpdate(response.data).then(function(response){
                        return channelList;
                    });
                }else{
                    return chennelDetailsSave(response.data).then(function(response){
                        return channelList;
                    });
                }                
            });

        };

        chennelDetailsSave = function(paramsObj){
            params.acess = shareBaseUrl.BaseUrl();
            params.channelData = paramsObj;
            params.userId = params.acess.userId;
            params.scriptTag = responseData.scriptTag.tag;
            params.channelName = responseData.channelName;
            params.channelAccessToken = responseData.channelAccessToken;
            params.scriptTag = responseData.scriptTag.tag;
            var promise = $http.post(params.acess.BaseUrl + 'addNewChannel', {params} ).then(function(response) {
                    return response;
                });
                return promise;
        };

        chennelDetailsUpdate = function(paramsObj){
            params.acess = shareBaseUrl.BaseUrl();
            params.channelData = paramsObj;
            params.userId = params.acess.userId;
            params.scriptTag = responseData.scriptTag.tag;
            params.channelName = responseData.channelName;
            params.channelAccessToken = responseData.channelAccessToken;
            params.editChanelId = responseData.editChanelId;
            params.scriptTag = responseData.scriptTag.tag;
            var promise = $http.post(params.acess.BaseUrl + 'editCampaignChannel', {params} ).then(function(response) {
                    return response;
                });
                return promise;
        };

    //end channel section
    
    this.editCampaignChennel = function(paramsObj){
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.post(params.acess.BaseUrl + 'editCampaignChannel', {params} ).then(function(response) {
                return response;
            });
            return promise;        
        };

    this.deleteCampaignChennel = function(params){
        params.acess = shareBaseUrl.BaseUrl();
        params = params;
        var promise = $http.post(params.acess.BaseUrl + 'deleteCampaignChannel', {params} ).then(function(response) {
                return response;
            });
            return promise;
        };
});