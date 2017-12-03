 app.factory('audienceFactory',['audienceService','$filter', function(audienceService, $filter){
	var dataFactory = {};

		dataFactory.getAudienceSegement= function(chanelId){			
			return audienceService.getAudienceSegement(chanelId).then(function(response) {
				return response.data;
			})
		};
		dataFactory.postAudienceSegement = function(segment){
			//curent date
			var date = $filter('date')(new Date(), 'dd/MM/yyyy');
			// var datadate = document.getElementById("daterange").value;
			// var dateRangeArray = datadate.split('-');			
			var params = {}
	            params.segementDatat = segment.segmentData;
	            params.channel_id = segment.chanelId;
	            params.segment_type = segment.segment_type;
	            params.create_date = date;
	            params.update_date = date;
	            params.status = true;
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