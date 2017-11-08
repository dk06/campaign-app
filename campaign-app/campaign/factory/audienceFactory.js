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

	    dataFactory.getDemographic = function(params){
	    	var customNewSegments = {

				ageGroup : [],
				gender : [],
				language : []
			}
        return audienceService.getDemographic(params).then(function(response, status){
            	angular.forEach( response.data.ageGroup, function(value, key){
					if (value.custom_seg_ref_id == 1) {
						customNewSegments.ageGroup.push({
							'age_id' : value.age_id,
							'age' : value.age_group
						})
					}
				});
				angular.forEach(response.data.gender , function(value, key){
					if (value.custom_seg_ref_id == 1) {
						customNewSegments.gender.push({
							'gender_id' : value.gender_id,
							'gender' : value.gender
						})
					}
				});
				angular.forEach(response.data.language , function(value, key){
					if (value.custom_seg_ref_id == 1) {
						customNewSegments.language.push({
							'lag_id' : value.lag_id,
							'language' : value.language
						})
					}
				});
			    return customNewSegments;
			});
	    };

	    dataFactory.getTechnology = function(){
	    	return audienceService.getTechnology().then(function(response, status){
	    		return response.data;
	    	});
	    };

	    dataFactory.getBehaviour = function(){
	    	return audienceService.getBehaviour().then(function(response, status){
	    		return response.data;
	    	});
	    };

	    dataFactory.getLocation = function(){
	    	return audienceService.getLocation().then(function(response, status){
	    		return response.data;
	    	});
	    };
		
		return dataFactory;
 }]);