 app.factory('campaignChannelFactory',['campaignChannelService','$filter', function(campaignChannelService, $filter){
	var dataFactory = {};

		dataFactory.getCampaignChanel= function(){
			var channelList = []
			return campaignChannelService.getChanel().then(function(response) {
				angular.forEach( response.data, function(value, key){
                    channelList.push({
                    		'channelType' : value.channel_name,
                            'advertType' : value.adverType,
                            'startDate' : value.create_date,
                            'endDate' : value.update_date,
                            'bidmin' : value.bid_min,
                            'bidmax' : value.bid_Max,
                            'channelBudget' : value.channel_Budget,
                            'scriptTag' :  value.scriptTag,
                            'channel_id' : value.channel_id,
                            'status' :  value.status
                        })
                });
				return channelList;
			})
		};

		dataFactory.viewCampaignChanel= function(params){			 
			return campaignChannelService.getViewChanel(params).then(function(response) {
				return response.data;
			})
		};

		dataFactory.getCampaignNameAndId= function(CampaignNameAndId){			 
			return campaignChannelService.getCampaignNameAndId(CampaignNameAndId).then(function(response) {
				return response;
			})
		};

		dataFactory.getChannelByID= function(CampaignNameAndId){
			return campaignChannelService.getChannelByID(CampaignNameAndId).then(function(response) {
				return response;
			})
		};

		dataFactory.getChannelType= function(){			 
			return campaignChannelService.getChannelType().then(function(response) {
				return response.data;
			})
		};

		dataFactory.getChannelData= function(params){		 
			return campaignChannelService.getChannelData(params).then(function(response) {
				return response;
			})
		};

		dataFactory.savedChannel= function(params){		 
			return campaignChannelService.savedChannel(params).then(function(response) {
				return response.data;
			})
		};


	    dataFactory.deleteCampaignChennel = function(params){
	        return campaignChannelService.deleteCampaignChennel(params).then(function(response,status){
	            return response.data;
	        });
	    };
		
		return dataFactory;
 }]);