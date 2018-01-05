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
                        'awarnes': value.sub_objective_name,
                        'icons_tag': value.icons_tag
                    })
                } else if(value.objective_id == 2){
                    campaningData.consdrition.push({
                        'id': value.obj_id,
                        'consdrition': value.sub_objective_name,
                        'icons_tag': value.icons_tag
                    })
                } else if(value.objective_id == 3){
                    campaningData.converstion.push({
                        'id': value.obj_id,
                        'converstion': value.sub_objective_name,
                        'icons_tag': value.icons_tag
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
                language : [],
                affinityCategory : [],
                marketSegment : [],
                IAB : [],
                incomeDetails : [],
                facebookDetails : []
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
                angular.forEach(response.data.affinityCategory , function(value, key){
                    customNewSegments.affinityCategory.push({
                            'Seg_category_id' : value.category_id,
                            'category_name' : value.category_name
                        })
                });
                angular.forEach(response.data.marketSegment , function(value, key){
                    customNewSegments.marketSegment.push({
                            'Seg_category_id' : value.category_id,
                            'seg_category_name' : value.category_name
                        })
                });
                angular.forEach(response.data.IAB , function(value, key){
                    customNewSegments.IAB.push({
                            'seg_id' : value.seg_id,
                            'category_name' : value.category_name
                        })
                });
                angular.forEach(response.data.incomeDetails , function(value, key){
                    customNewSegments.incomeDetails.push({
                            'income_id' : value.income_id,
                            'income_name' : value.income
                        })
                });
                angular.forEach(response.data.facebookData , function(value, key){
                    customNewSegments.facebookDetails.push({
                            'fb_id' : value.fb_id,
                            'fb_category_name' : value.fb_category_name,
                            'fb_code': value.fb_code
                        })
                });
                return customNewSegments;
            });
        };

        dataFactory.getTechnology = function(){
            return campaignService.getTechnology().then(function(response, status){
                return response.data;
            });
        };      
        dataFactory.getDeviceModel = function(deviceType){
            return campaignService.getDeviceModel(deviceType).then(function(response, status){
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

        dataFactory.saveFinalCampaign = function(finalObj){
            return campaignService.postSaveFinalCampaign(finalObj).then(function(response, status){
                return response;
            });
        };

        dataFactory.updateFinalCampaign = function(finalObj){
            return campaignService.updateFinalCampaign(finalObj).then(function(response, status){
                return response;
            });
        };

        dataFactory.getFinalCampaignList = function(){
            return campaignService.getFinalCampaignList().then(function(response, status){
                return response.data;
            });
        };

        dataFactory.deleteSelectCampaign = function(campaign_id){
            return campaignService.deleteSelectCampaign(campaign_id).then(function(response, status){
                return response.data;
            });
        };
		
		return dataFactory;
 }]);