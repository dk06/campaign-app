 app.factory('audienceFactory',['audienceService','$filter', function(audienceService, $filter){
	var dataFactory = {};

		dataFactory.getAudienceSegement= function(chanelId){			
			return audienceService.getAudienceSegement(chanelId).then(function(response) {
				return response.data;
			})
		};
		dataFactory.postAudienceSegement = function(segment){
			var date = $filter('date')(new Date(), 'dd/MM/yyyy');
			var params = {
		            segement_name : segment.segmentData.segementName,
		            segment_form_data : segment.segmentData.segment_form_data,
		            channel_id : segment.chanelId,
		            create_date : date,
		            update_date : date,
		            status : 1
		        }
			return audienceService.postAudienceSegement(params).then(function(response) {
				return response;
			})
		};
		dataFactory.editAudienceSegement = function(params){
        return audienceService.editAudienceSegement(params).then(function(response, status){
            	return response.data;
	        });
	    };

	    dataFactory.deleteAudienceSegement = function(params){
	        return audienceService.deleteAudienceSegement(params).then(function(response,status){
	            return response.data;
	        });
	    };

	    dataFactory.getCustomSegmentsFields = function(){
	    	return audienceService.getCustomSegmentsFields().then(function(response, status){
	    		return response.data;
	    	});
	    };
		
		return dataFactory;
 }]);