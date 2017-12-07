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

	    dataFactory.getPrivateReach = function(privateData){
	    	return audienceService.getPrivateReach(privateData).then(function(response, status){
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
	    	var privateFormData = {
	            ageGroup : [],
	            gender : [],
	            incomeDetails : [],
	            language : [],
	            affinityCategory : [],
	            marketSegment : [],
	            IAB : [],
	            technologyData : [],
	            locations : [],
	            mobiledeviceobj : []
	        }
            return audienceService.getTargetingSummary().then(function(response, status){
	            angular.forEach( response.ageobj, function(value, key){                
                    privateFormData.ageGroup.push({
                        'age_id' : value.id,
                        'age' : value.age
                    })
	            });
	            angular.forEach(response.genderobj , function(value, key){                
                    privateFormData.gender.push({
                        'gender_id' : value.id,
                        'gender' : value.gender
                    })
	            });
	            angular.forEach(response.incomeobj , function(value, key){                
                    privateFormData.incomeDetails.push({
                        'income_id' : value.id,
                        'income_name' : value.income
                    })
	            });
	            var category  = response.audiencesegmentobj[0];
	            angular.forEach(category.subcategory , function(value, key){                
                    privateFormData.IAB.push({
                        'category_Id' : value.id,
                        'category_name' : value.subcategory
                    })
	            });
	            angular.forEach(response.deviceObject , function(value, key){                
                    privateFormData.technologyData.push({
                        'device_Id' : value.id,
                        'device_type' : value.device_type
                    })
	            });
	            angular.forEach(response.mobiledeviceobj , function(value, key){                
                    privateFormData.mobiledeviceobj.push({
                        'model_Id' : value.id,
                        'Model' : value.mobiledevicemodel
                    })
	            });
	            angular.forEach(response.language , function(value, key){                
                    privateFormData.language.push({
                        'language_Id' : value.id,
                        'language' : value.language
                    })
	            });
	            angular.forEach(response.locations , function(value, key){                
                    privateFormData.locations.push({
                        'id' : value.id,
                        'country_type': value.country,
                        'state_type' : value.state,
                        'city_type' : value.city
                    })
	            });
	    		return privateFormData;
	    	});
	    };
		
		return dataFactory;
 }]);