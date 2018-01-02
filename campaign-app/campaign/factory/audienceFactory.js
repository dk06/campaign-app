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
	            params.segementDatat = segment;
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

	    dataFactory.updateSegementType= function(segement, updateSegment, segementId){
	    	var segmentsMarketData = [];
	    	var segmentsAffinityData = [];
	    	var seg_Id = '';
	    	var segement_type = updateSegment;
	    	var segId_split = segement.IAB.split(',');
	    	angular.forEach(segId_split, function(value){
	    		if(seg_Id == ''){
	    			seg_Id = value;
	    		}else{
	    			seg_Id = seg_Id + ',' + value;
	    		}
	    	});
	    	var categoryType = 'market';
	    	return audienceService.getCustomSegementChanges(segement_type, categoryType, seg_Id).then(function(response, status){
	    		segmentsMarketData = response;
	    		var categoryType = 'affinity';
	    		return audienceService.getCustomSegementChanges(segement_type, categoryType, seg_Id).then(function(response, status){
		    		segmentsAffinityData = response;
		    		if(segmentsMarketData.length != 0 && segmentsAffinityData.length != 0) {
		    			return audienceService.updateSegementType(updateSegment, segementId, segmentsMarketData, segmentsAffinityData).then(function(response) {
							return response.data;
						});
		    		}
		    	});
	    	});
		};

	    dataFactory.getCustomReach = function(segment){
	    	return audienceService.getCustomReach(segment).then(function(response, status){
	    		return response.data;
	    	});
	    };

	    dataFactory.getPrivateReach = function(){
	    	return audienceService.getTargetingSummary().then(function(response, status){
	    		var gender = '';
                angular.forEach(response.TargetingSummary.genderobj, function(value , key){
                    if (gender == '') {
                        gender = value.id;
                    }else{
                        gender = gender + ',' + value.id;
                    }
                });

                var ageId = '';
                angular.forEach(response.TargetingSummary.ageobj, function(value , key){
                    if (ageId == '') {
                        ageId = value.id;
                    }else{
                        ageId = ageId + ',' + value.id;
                    }
                });

                var incomeid = '';
                angular.forEach(response.TargetingSummary.incomeobj, function(value , key){
                    if (incomeid == '') {
                        incomeid = value.id;
                    }else{
                        incomeid = incomeid + ',' + value.id;
                    }
                });

                var deviceId = '';
                angular.forEach(response.TargetingSummary.deviceObject, function(value , key){
                    if (deviceId == '') {
                        deviceId = value.id;
                    }else{
                        deviceId = deviceId + ',' + value.id;
                    }
                });

	    		return audienceService.getPrivateReach(gender, ageId, incomeid, deviceId ).then(function(response, status){
		    		return response.data;
		    	});
	    	});
	    };

	    dataFactory.getPrivateAudienceMarketplaceList = function(){
	    	return audienceService.getPrivateAudienceMarketplaceList().then(function(response, status){
	    		return response;
	    	});
	    };

	    dataFactory.getCustomSegementChanges = function(segement_type, categoryType, seg_Id){
	    	return audienceService.getCustomSegementChanges(segement_type, categoryType, seg_Id).then(function(response, status){
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
	            mobiledeviceobj : [],
	            apiResponce : [],
	            operatingsystem : []
	        }
            return audienceService.getTargetingSummary().then(function(response, status){            	 
            	privateFormData.apiResponce = response.TargetingSummary;
	            angular.forEach( response.TargetingSummary.ageobj, function(value, key){                
                    privateFormData.ageGroup.push({
                        'age_id' : value.id,
                        'age' : value.age
                    })
	            });
	            angular.forEach(response.TargetingSummary.genderobj , function(value, key){                
                    privateFormData.gender.push({
                        'gender_id' : value.id,
                        'gender' : value.gender
                    })
	            });
	            angular.forEach(response.TargetingSummary.incomeobj , function(value, key){                
                    privateFormData.incomeDetails.push({
                        'income_id' : value.id,
                        'income_name' : value.income
                    })
	            });
	            var category  = response.TargetingSummary.audiencesegmentobj;
	            angular.forEach(category, function(value, key){
		            privateFormData.IAB.push({
                        'seg_id' : value.id,
                        'category_name' : value.audienceSegment
                    });
		        });

		        angular.forEach(category, function(value, key){
		            angular.forEach(value.subcategory, function(value, key){
		                privateFormData.IAB.push({
                        'seg_id' : value.id,
                        'category_name' : value.audienceSegment ? value.subcategory : value.subcategory
                    	})
		            });
		        });


	            // angular.forEach(category , function(value, key){                
             //        privateFormData.IAB.push({
             //            'seg_id' : value.id,
             //            'category_name' : value.segments ? value.subcategory : value.subcategory
             //        })
	            // });
	            angular.forEach(response.TargetingSummary.deviceObject , function(value, key){                
                    privateFormData.technologyData.push({
                        'device_Id' : value.id,
                        'device_type' : value.device_type
                    })
	            });
	            angular.forEach(response.TargetingSummary.mobiledeviceobj , function(value, key){                
                    privateFormData.mobiledeviceobj.push({
                        'model_Id' : value.id,
                        'Model' : value.mobiledevicemodel
                    })
	            });
	            angular.forEach(response.TargetingSummary.language , function(value, key){                
                    privateFormData.language.push({
                        'language_Id' : value.id,
                        'language' : value.language
                    })
	            });
	            angular.forEach(response.TargetingSummary.locations , function(value, key){                
                    privateFormData.locations.push({
                        'country_names': value.country,
                        'country_codes' : value.countryId,
                        'state_names' : value.state,
                        'state_code' : value.stateId,
                        'city_names' : value.city,
                        'cityId': value.cityId
                    })
	            });

	            angular.forEach(response.TargetingSummary.operatingsystem , function(value, key){                
                    privateFormData.operatingsystem.push({
                        'operating_sys_id' : value.id,
                        'os_version' : value.os
                    })
	            });
	    		return privateFormData;
	    	});
	    };

	    // dataFactory.getChannelPortedCategories = function(portedCategories){
	    // 	var PortedCategoriesData = {}
	    // 	return audienceService.getChannelPortedCategories(portedCategories).then(function(response, status){
	    // 		angular.forEach(response, function(value, key){
	    // 			PortedCategoriesData.push({'segments' : value.segments});
	    // 		});
	    // 		return PortedCategoriesData;
	    // 	});
	    // };

	    dataFactory.getChannelPortedCategories = function(segement_type, categoryType, seg_Id){
	    	return audienceService.getChannelPortedCategories(segement_type, categoryType, seg_Id).then(function(response, status){
	    		return response.data;
	    	});
	    };
		
		return dataFactory;
 }]);