 app.factory('audienceFactory',['audienceService','$filter', function(audienceService, $filter){
	var dataFactory = {};

		dataFactory.getAudienceSegement= function(chanelId){			
			return audienceService.getAudienceSegement(chanelId).then(function(response) {
				return response.data;
			})
		};
		dataFactory.postAudienceSegement = function(segment){
			//curent date
			//var date = $filter('date')(new Date(), 'dd/MM/yyyy');
			var datadate = document.getElementById("daterange").value;
			var dateRangeArray = datadate.split('-');			
			var params = {
		            segement_name : segment.segmentData.segementName,
		            segment_form_data : segment.segmentData.segment_form_data,
		            channel_id : segment.chanelId,
		            create_date : dateRangeArray[0],
		            update_date : dateRangeArray[1],
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