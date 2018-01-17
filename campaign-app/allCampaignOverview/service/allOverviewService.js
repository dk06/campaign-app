app.service('allOverviewService', function ($rootScope, $http, shareBaseUrl) {
	var url = {};
	var params = {};
	params = shareBaseUrl.BaseUrl();

    //http://205.147.101.67:8080/marketingreports/report/getCuberootCampaignIds?dateRange=2016-01-01,2017-01-01
    this.getCompanyList = function (param) {    
    var promise = $http.get(params.cuberootMarketBaseUrl + 'getCuberootCampaignIds' ,{params: {dateRange : param.dateRange}} ).then(function(response) {
            return response;
        });
    return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/metricdata?dateRange=2016-01-01_2017-01-31&campaign_id=12721&aggregated=false&channel=all
    this.getChannelsData = function (param) {    
    var promise = $http.get(params.cuberootMarketBaseUrl + 'metricdata' ,{params: {dateRange : param.dateRange, campaign_id : param.campaign_id, channel : param.channel, aggregated : false}} ).then(function(response) {
            return response;
        });
    return promise;
    },

    // this.getDurationOnValueAxisChart = function (param) {    
    // var promise = $http.get(params.cuberootMarketBaseUrl + 'metricdata' ,{params: {dateRange : param.dateRange, campaign_id : param.campaign_id,aggregated : param.aggregated}} ).then(function(response) {
    //         return response;
    //     });
    // return promise;
    // },

    //http://205.147.101.67:8080/marketingreports/report/device?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=all&aggregated=true
    this.getDeviceData = function (param) {    
    var promise = $http.get(params.cuberootMarketBaseUrl + 'device' ,{params: {dateRange : param.dateRange,metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel}} ).then(function(response) {
            return response;
        });
    return promise;
    },
    //http://205.147.101.67:8080/marketingreports/report/brand?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=all&aggregated=true    
    this.getDeviceBrandDataData = function (param) {    
    var promise = $http.get(params.cuberootMarketBaseUrl + 'brand' ,{params: {dateRange : param.dateRange, metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel}} ).then(function(response) {
            return response;
        });
    return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/isp?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=all&aggregated=true
    this.getDeviceServiceDataData = function (param) {    
    var promise = $http.get(params.cuberootMarketBaseUrl + 'isp' ,{params: {dateRange : param.dateRange,metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel}} ).then(function(response) {
            return response;
        });
    return promise;
    },

    ////http://205.147.101.67:8080/marketingreports/report/os?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=all&aggregated=true
    this.getDeviceOpSystemDataData = function (param) {    
    var promise = $http.get(params.cuberootMarketBaseUrl + 'os' ,{params: {dateRange : param.dateRange,metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel}} ).then(function(response) {
            return response;
        });
    return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/screensize?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=all&aggregated=true
    this.getDeviceScreenSizeDataData = function (param) {    
    var promise = $http.get(params.cuberootMarketBaseUrl + 'screensize' ,{params: {dateRange : param.dateRange,metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel}} ).then(function(response) {
            return response;
        });
    return promise;
    },

	//http://205.147.101.67:8080/marketingreports/report/gender?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=Adwords&aggregated=true
    this.getGenderData = function (param) {    
    var promise = $http.get(params.cuberootMarketBaseUrl + 'gender' ,{params: {dateRange : param.dateRange,metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel}} ).then(function(response) {
            return response;
        });
    return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/income?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=Adwords&aggregated=true
    this.getIncomeLevelData = function(param) {        
        var promise = $http.get(params.cuberootMarketBaseUrl +'income', { params: {dateRange : param.dateRange,metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel} }).then(function(response) {
            return response;
        });
        return promise;
    }, 

    //http://205.147.101.67:8080/marketingreports/report/agegroup?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=Adwords&aggregated=true
    this.getAgeGroupData = function(param) {        
        var promise = $http.get(params.cuberootMarketBaseUrl +'agegroup', { params: {dateRange : param.dateRange,metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel} }).then(function(response) {
            return response;
        });
        return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/cityOthers?dateRange=2016-01-01_2017-01-31&metric=impression&campaign_id=12721&channel=all&aggregated=true
    this.cityData = function(param) {        
        var promise = $http.get(params.cuberootMarketBaseUrl +'cityOthers', { params: {dateRange : param.dateRange,metric : param.metric, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel} }).then(function(response) {
            return response;
        });
        return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/duration?dateRange=2016-01-01_2017-01-31&campaign_id=12721&aggregated=true
    this.campaignDuration = function(param) {        
        var promise = $http.get(params.cuberootMarketBaseUrl +'duration', { params: {dateRange : param.dateRange, campaign_id : param.campaign_id,aggregated : param.aggregated} }).then(function(response) {
            return response;
        });
        return promise;
    },

    this.getCostVsBudget = function(param) {        
        var promise = $http.get(params.cuberootMarketBaseUrl +'duration', { params: {dateRange : param.dateRange, campaign_id : param.campaign_id,aggregated : param.aggregated} }).then(function(response) {
            return response;
        });
        return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/metricdatadatewise?dateRange=2016-01-01_2017-01-31&campaign_id=12721&aggregated=true&channel=Adwords
    this.getDurationOnValueAxisChart = function(param) {        
        var promise = $http.get(params.cuberootMarketBaseUrl +'metricdatadatewise', { params: {dateRange : param.dateRange, campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel} }).then(function(response) {
            return response;
        });
        return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/metricdata?dateRange=2016-01-01_2017-01-31&campaign_id=12721&aggregated=true&channel=Adwords
    this.getBulletChartData = function(param) {        
        var promise = $http.get(params.cuberootMarketBaseUrl +'metricdata', { params: {dateRange : param.dateRange, campaign_id : param.campaign_id,aggregated : false, channel : param.channel} }).then(function(response) {
            return response;
        });
        return promise;
    },

    //http://205.147.101.67:8080/marketingreports/report/audience_segment?dateRange=2016-01-01_2017-01-31&metric=reach&campaign_id=12721&channel=Adwords&aggregated=true
    this.getAudienceSegementList = function(param) {        
        var promise = $http.get(params.cuberootMarketBaseUrl +'audience_segment', { params: {dateRange : param.dateRange,metric : 'reach', campaign_id : param.campaign_id,aggregated : param.aggregated, channel : param.channel} }).then(function(response) {
            return response;
        });
        return promise;
    }

});
