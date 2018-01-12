 app.factory('allOverviewFactory',['allOverviewService','$filter','sharedMain', function(allOverviewService, $filter, sharedMain){
	var dataFactory = {};

        dataFactory.getCompanyList = function(param){
            return allOverviewService.getCompanyList(param).then(function(response, status){
                return response.data;
            });
        };

        dataFactory.getChannelsData = function(param) {            
            return allOverviewService.getChannelsData(param).then(function(response) {
                return response.data;
            });
        };

        // dataFactory.getDurationOnValueAxisChart = function(param) {            
        //     return allOverviewService.getDurationOnValueAxisChart(param).then(function(response) {
        //         return response.data;
        //     });
        // };

        dataFactory.getDeviceData = function(param) {
            var deviceData = {
                    data: [],
                    chartData: [],
                    charOptions: [],
                    messageStatus: []
                };
            var colorList = sharedMain.colors;
            var colorIndex = 0;
            return allOverviewService.getDeviceData(param).then(function(response) {
                deviceData.messageStatus.push(response.message);                
                angular.forEach(response.data, function(value, key) {
                    deviceData.data.push({ 'type': value.device_type, 'devicetypecode': value.devicetypecode, 'conversions': value.conversions, 'share': value.impressions, 'reach': value.impressions,'deviceId': value.cuberootcampaignId, 'color': colorList[colorIndex] });
                    colorIndex = colorIndex < colorList.length - 1 ? colorIndex + 1 : 0;
                });
                deviceData.chartData = dataFactory.visitorDataChart(deviceData.data);
                return deviceData;
            });
        };

        dataFactory.getDeviceBrandDataData = function(param) { 
            var devideData = {
                data: []
            }           
            return allOverviewService.getDeviceBrandDataData(param).then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    devideData.data.push({ 'device_type': value.brand, 'devicetypecode': value.devicetypecode, 'conversions': value.conversions, 'share': value.impressions, 'reach': value.impressions,'deviceId': value.cuberootcampaignId });
                });
                return devideData.data;
            });
        };

        dataFactory.getDeviceServiceDataData = function(param) { 
            var devideData = {
                data: []
            }           
            return allOverviewService.getDeviceServiceDataData(param).then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    devideData.data.push({ 'device_type': value.isp, 'devicetypecode': value.devicetypecode, 'conversions': value.conversions, 'share': value.impressions, 'reach': value.impressions,'deviceId': value.cuberootcampaignId });
                });
                return devideData.data;
            });
        };

        dataFactory.getDeviceOpSystemDataData = function(param) { 
            var devideData = {
                data: []
            }           
            return allOverviewService.getDeviceOpSystemDataData(param).then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    devideData.data.push({ 'device_type': value.os, 'devicetypecode': value.devicetypecode, 'conversions': value.conversions, 'share': value.impressions, 'reach': value.impressions,'deviceId': value.cuberootcampaignId });
                });
                return devideData.data;
            });
        };

        dataFactory.getDeviceScreenSizeDataData = function(param) { 
            var devideData = {
                data: []
            }           
            return allOverviewService.getDeviceScreenSizeDataData(param).then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    devideData.data.push({ 'device_type': value.screensize, 'devicetypecode': value.devicetypecode, 'conversions': value.conversions, 'share': value.impressions, 'reach': value.impressions,'deviceId': value.cuberootcampaignId });
                });
                return devideData.data;
            });
        };

	    dataFactory.getGenderData = function(param) {
            var totalCount = 0;
            var genderData = {
                data: [],
                chartData: [],
                charOptions: [],
                messageStatus: []
            };
            var colorList = sharedMain.colors;
            var colorIndex = 0;
            return allOverviewService.getGenderData(param).then(function(response) {
                genderData.messageStatus.push(response.message);                
                angular.forEach(response.data, function(value, key) {
                    genderData.data.push({ 'type': value.gender, 'conversions': value.conversions, 'share': value.impressions, 'reach': value.impressions,'genderId': value.cuberootcampaignId, 'color': colorList[colorIndex] });
                    colorIndex = colorIndex < colorList.length - 1 ? colorIndex + 1 : 0;
                });
                genderData.chartData = dataFactory.visitorDataChart(genderData.data);
                return genderData;
            });
        };

        dataFactory.incomeLevelData = function(params) {
            var totalCount = 0;
            var incomeData = {
                data: [],
                chartData: [],
                charOptions: [],
                messageStatus: []
            };
            var colorList = sharedMain.colors;
            var colorIndex = 0;
            return allOverviewService.getIncomeLevelData(params).then(function(response) {
                incomeData.messageStatus.push(response.message);                
                angular.forEach(response.data, function(value, key) {
                    incomeData.data.push({ 'type': value.income, 'conversions': value.conversions, 'reach': value.impressions, 'share': value.impressions,'genderId': value.cuberootcampaignId, 'color': colorList[colorIndex] });
                    colorIndex = colorIndex < colorList.length - 1 ? colorIndex + 1 : 0;
                });
                incomeData.chartData = dataFactory.visitorDataChart(incomeData.data);
                return incomeData;
            });

        };

        dataFactory.ageGroupData = function(params) {
            var totalCount = 0;
            var agegroupData = {
                data: [],
                chartData: [],
                charOptions: [],
                messageStatus: []
            };
            var colorList = sharedMain.colors;
            var colorIndex = 0;
            return allOverviewService.getAgeGroupData(params).then(function(response) {
                agegroupData.messageStatus.push(response.message);                
                angular.forEach(response.data, function(value, key) {
                    //var ageGroup = value.age && value.age.toString().toLowerCase().indexOf('y') > -1 ? value.age.toString().toLowerCase().split('y')[0] : value.age;
                    agegroupData.data.push({ 'type': value.age, 'conversions': value.conversions, 'reach': value.impressions, 'share': value.impressions,'genderId': value.cuberootcampaignId, 'color': colorList[colorIndex] })
                    colorIndex = colorIndex < colorList.length - 1 ? colorIndex + 1 : 0;
                });
                agegroupData.chartData = dataFactory.visitorDataChart(agegroupData.data);
                return agegroupData;
            });

        };

        dataFactory.visitorDataChart = function fillVisitorChartData(data) {
            var visitorChart = [];
            angular.forEach(data, function(value, key) {
                visitorChart.push({ key: value.type, y: value.share });
            });
            return visitorChart;
        };

        dataFactory.cityData = function(param) {
            var cityData = {
                data: []
            }           
            return allOverviewService.cityData(param).then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    var trueDate = value.citylatlong;
                    if (trueDate != undefined) {
                        var valuesData = value.citylatlong;
                        var splitData = valuesData.split(',');
                        cityData.data.push({ 'loaction_type': value.city,'title': value.city,"latitude": parseFloat(splitData[0]), "longitude": parseFloat(splitData[1]), 'citycode': value.citycode,'citylatlong': value.citylatlong, 'conversions': value.conversions, 'share': value.impressions, 'reach': value.impressions,'deviceId': value.cuberootcampaignId });
                    }
                });
                return cityData.data;
            });
        };

        dataFactory.campaignDuration = function(param) {
            var campaighDurationData = {
                    data: [],
                    chartData: [],
                    charOptions: [],
                    messageStatus: []
                };
            var colorList = sharedMain.colors;
            var colorIndex = 0;
            return allOverviewService.campaignDuration(param).then(function(response) {
                campaighDurationData.messageStatus.push(response.message);                
                angular.forEach(response.data, function(value, key) {
                    campaighDurationData.data.push({ 'type': '', 'share': value.duration, 'color': colorList[colorIndex] });
                    colorIndex = colorIndex < colorList.length - 1 ? colorIndex + 1 : 0;
                });
                campaighDurationData.chartData = dataFactory.visitorDataChart(campaighDurationData.data);
                return campaighDurationData;
            });
        };

        dataFactory.getCostVsBudget = function(param) {
            var campaighDurationData = {
                    data: [],
                    chartData: [],
                    charOptions: [],
                    messageStatus: []
                };
            var colorList = sharedMain.colors;
            var colorIndex = 0;
            return allOverviewService.getCostVsBudget(param).then(function(response) {
                campaighDurationData.messageStatus.push(response.message);                
                angular.forEach(response.data, function(value, key) {
                    campaighDurationData.data.push({ 'type': '', 'share': value.duration, 'color': colorList[colorIndex] });
                    colorIndex = colorIndex < colorList.length - 1 ? colorIndex + 1 : 0;
                });
                campaighDurationData.chartData = dataFactory.visitorDataChart(campaighDurationData.data);
                return campaighDurationData;
            });
        };

        dataFactory.getDurationOnValueAxisChart = function(param) {
            var MetricData= {
                data : []
            }
            return allOverviewService.getDurationOnValueAxisChart(param).then(function(response) {
                angular.forEach(response.data, function(value, key) {

                    MetricData.data.push({ 'date' : value.date,'value' : parseInt(value.clicks),'volume' : parseInt(value.impressions),'sales1' : parseInt(value.cost),'sales2' : parseInt(value.cost) });
                });
                return MetricData.data;
            });
        };

        dataFactory.getbulletChartData = function(param) {
            var MetricData= {
                data : []
            }
            return allOverviewService.getBulletChartData(param).then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    MetricData.data.push({ 'bullet' : parseInt(value.reach),'reach' : value.reach ,'conversions' : value.conversions,'impressions' : value.impressions,'cpconversion' : value.cpconversion,'cost' : value.cost,'clicks' : value.clicks,'cpm' :  value.cpm, 'cpc' : value.cpc, 'cpconversion' : value.cpconversion,'cpp' : value.cpp,'cuberootcampaignId' : value.cuberootcampaignId });
                });
                return MetricData.data;
            });
        };

        dataFactory.getAudienceSegement = function(param) {            
            return allOverviewService.getAudienceSegementList(param).then(function(response) {
                return response.data;
            });
        };

		
		return dataFactory;
 }]);