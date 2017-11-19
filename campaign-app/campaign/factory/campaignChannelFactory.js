 app.factory('campaignChannelFactory',['campaignChannelService','$filter', function(campaignChannelService, $filter){
	var dataFactory = {};

		dataFactory.getCampaignChanel= function(){			 
			return campaignChannelService.getChanel().then(function(response) {
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

		// dataFactory.postCampaignChanel= function(channel){
		// 	if(channel){
		// 		var date = $filter('date')(new Date(), 'dd/MM/yyyy');
		// 		var datadate = document.getElementById("daterange").value;
		// 		var dateRangeArray = datadate.split('-');
		//         var params = {
		//             channelData : channel,
		//             create_date : dateRangeArray[0],
		//             update_date : dateRangeArray[1],
		//             status : 1
		//         }
		// 	return campaignChannelService.postCampaignChanel(params).then(function(response) {
		// 		return response.data;
		// 	})
		// 	}
		// };ctory.editCampaignChennel = function(params){
  //       return campaignChannelService.editCampaignChennel(params).then(function(response, status){
  //           	return response.data;
	 //        });
	 //    };

	    dataFactory.deleteCampaignChennel = function(params){
	        return campaignChannelService.deleteCampaignChennel(params).then(function(response,status){
	            return response.data;
	        });
	    };
		
		return dataFactory;
 }]);