 app.factory('campaignFactory',['campaignService','$filter', function(campaignService, $filter){
	var dataFactory = {};

		dataFactory.getCategories= function(){
			 var campaningData = {
	        	awarnes : [],
	        	consdrition : [],
	        	converstion : []
        	}
			return campaignService.getCategories().then(function(response) {
				angular.forEach(response.data, function(value, key) {
        		if(value.objective_id == 1){
                    campaningData.awarnes.push({
                        'id': value.obj_id,
                        'awarnes': value.sub_objective_name
                    })
                } else if(value.objective_id == 2){
                    campaningData.consdrition.push({
                        'id': value.obj_id,
                        'consdrition': value.sub_objective_name
                    })
                } else if(value.objective_id == 3){
                    campaningData.converstion.push({
                        'id': value.obj_id,
                        'converstion': value.sub_objective_name
                    })
                }
                });
				return campaningData;
			})
		};

        dataFactory.getDemographic = function(params){
            var customNewSegments = {

                ageGroup : [],
                gender : [],
                language : []
            }
        return campaignService.getDemographic(params).then(function(response, status){
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
            return campaignService.getTechnology().then(function(response, status){
                return response.data;
            });
        };      

        dataFactory.getCountry = function(){
            return campaignService.getCountry().then(function(response, status){
                return response.data;
            });
        };

        dataFactory.getState = function(countyCode){
            return campaignService.getState(countyCode).then(function(response, status){
                return response.data;
            });
        };

        dataFactory.getCity = function(stateCode){
            return campaignService.getCity(stateCode).then(function(response, status){
                return response.data;
            });
        };
		
		return dataFactory;
 }]);