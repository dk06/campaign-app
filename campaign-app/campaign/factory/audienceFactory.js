 app.factory('audienceFactory',['audienceService','$filter', function(audienceService, $filter){
	var dataFactory = {};

		dataFactory.getAudienceSegement= function(){			
			return audienceService.getAudienceSegement().then(function(response) {
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

	    dataFactory.updateSegementType= function(updateSegment, segementId){			
			return audienceService.updateSegementType(updateSegment, segementId).then(function(response) {
				return response.data;
			})
		};

	    dataFactory.getCustomReach = function(segment){
	    	return audienceService.getCustomReach(segment).then(function(response, status){
	    		return response.data;
	    	});
	    };

	    dataFactory.getPrivateReach = function(){
	    	return audienceService.getPrivateReach().then(function(response, status){
	    		return response.data;
	    	});
	    };

	    dataFactory.getPrivateAudienceMarketplaceList = function(){
	    	return audienceService.getPrivateAudienceMarketplaceList().then(function(response, status){
	    		return response;
	    	});
	    };

	    dataFactory.getTargetingSummary = function(){
	    	// return audienceService.getTargetingSummary().then(function(response, status){
	    	// 	return response;
	    	// });
	    	var customNewSegments = {
            ageGroup : [],
            gender : [],
            language : [],
            affinityCategory : [],
            marketSegment : [],
            IAB : []
        }
            return audienceService.getTargetingSummary().then(function(response, status){
	            angular.forEach( response.ageobj, function(value, key){                
                    customNewSegments.ageGroup.push({
                        'age_id' : value.id,
                        'age' : value.age
                    })
	            });
	            angular.forEach(response.genderobj , function(value, key){                
                    customNewSegments.gender.push({
                        'gender_id' : value.id,
                        'gender' : value.gender
                    })
	            });
	            // angular.forEach(response.affinityCategory , function(value, key){
             //        customNewSegments.affinityCategory.push({
             //                'Seg_category_id' : value.category_id,
             //                'category_name' : value.category_name
             //            })
             //    });
             //    angular.forEach(response.marketSegment , function(value, key){
             //        customNewSegments.marketSegment.push({
             //                'Seg_category_id' : value.category_id,
             //                'seg_category_name' : value.category_name
             //            })
             //    });
             //    angular.forEach(response.IAB , function(value, key){
             //        customNewSegments.IAB.push({
             //                'seg_id' : value.seg_id,
             //                'category_name' : value.category_name
             //            })
             //    });
	    		return customNewSegments;
	    	});
	    };
		
		return dataFactory;
 }]);