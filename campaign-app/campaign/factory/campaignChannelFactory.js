 app.factory('campaignChannelFactory',['campaignChannelService','$filter', function(campaignChannelService, $filter){
	var dataFactory = {};

		dataFactory.getCampaignChanel= function(){			 
			return campaignChannelService.getChanel().then(function(response) {
				return response.data;
			})
		};

		dataFactory.viewCampaignChanel= function(params){			 
			return campaignChannelService.getViewChanel(params).then(function(response) {
				return response.data;
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

	    dataFactory.deleteCampaignChennel = function(params){
	        return campaignChannelService.deleteCampaignChennel(params).then(function(response,status){
	            return response.data;
	        });
	    };
		
		return dataFactory;
 }]);