app.controller('overviewController',['$scope','$rootScope','overviewFactory', '$window','$location','sharedMain','loaderEvent', function($scope, $rootScope, overviewFactory, $window,$location, sharedMain, loaderEvent) {

    $scope.loactionType = 'City';
    $rootScope.companyDropDownEvent = true;
    $scope.campaignObject = 'Adwords';

    var param = {};
        param.dateRange = '2016-01-01_2017-01-31';
        param.campaign_id = sharedMain.campaign_id;
        param.aggregated = true;
        param.channel = 'Adwords';
        param.channelAll = 'all';
        param.metric = 'impression';

	init();
    function init() {
        if ($window.localStorage.accessToken) {
            loaderEvent.loaderActivate();            

            overviewFactory.getChannelsData(param).then(function(data, status) {
                $scope.channelData = data;
            });

            overviewFactory.getDurationOnValueAxisChart(param).then(function(data, status) {                
                $scope.$broadcast('durationOnValueAxisChart', { data: $scope.durationValue });
            });

            overviewFactory.getbulletChartData(param).then(function(data, status) {                
                $scope.$broadcast('bulletChart', { data: $scope.bulletChartValue });
            });

            overviewFactory.getDeviceData(param).then(function(data, status) {
                $scope.deviceData = data;
                if (data.chartData.length == 0) {
                    $scope.deviceData.chartData.push({ key: '', y: 100 });
                    $scope.deviceData.chartOptions = chartNoDataOptions();
                } else {
                    $scope.deviceData.chartOptions = chartOptions('Device', data.chartData.length);
                }
            });

            overviewFactory.getDeviceBrandDataData(param).then(function(data, status) {
                $scope.brandName = 'Brand';
                $scope.deviceSectionData = data;
            });

            overviewFactory.getGenderData(param).then(function(data, status) {
                $scope.genderData = data;
                if (data.chartData.length == 0) {
                    $scope.genderData.chartData.push({ key: '', y: 100 });
                    $scope.genderData.chartOptions = chartNoDataOptions();
                } else {
                    $scope.genderData.chartOptions = chartOptions('Gender', data.chartData.length);
                }
            });

            overviewFactory.ageGroupData(param).then(function(data, status) {
                $scope.ageGroupData = data;
                if (data.chartData.length == 0) {
                    $scope.ageGroupData.chartData.push({ key: '', y: 100 });
                    $scope.ageGroupData.chartOptions = chartNoDataOptions();
                } else {
                    $scope.ageGroupData.chartOptions = chartOptions('  Age ', data.chartData.length);
                }
            });

            overviewFactory.incomeLevelData(param).then(function(data, status) {
                $scope.incomeData = data;
                if (data.chartData.length == 0) {
                    $scope.incomeData.chartData.push({ key: '', y: 100 });
                    $scope.incomeData.chartOptions = chartNoDataOptions();
                } else {
                    $scope.incomeData.chartOptions = chartOptions('Income',data.chartData.length);
                }
            });

            overviewFactory.campaignDuration(param).then(function(data, status) {
                $scope.campaignDurationData = data;
                $scope.campaignDurationData.chartOptions = campaignDurationChartOptions(data.chartData.length);
            });

            overviewFactory.getCostVsBudget(param).then(function(data, status) {
                $scope.costVsBudgetData = data;
                $scope.costVsBudgetData.chartOptions = campaignDurationChartOptions(data.chartData.length);
            });

            overviewFactory.cityData(param).then(function(data, status) {
                    $scope.cityData = data;
                    $scope.loactionType = 'City';
                    $scope.$broadcast('cityViewMap', { data: data });
                });
            loaderEvent.loaderDeactivate();
        }
    };

    $scope.selectBrandType = function(filter){
        $scope.brandName = filter;
        switch(filter){
            case 'Brand':
                brancdGet();
                break;
            case 'Service Provider':
                serviceGet();
                break;
            case 'Operating System':
                opSystemGet();
                break;
            case 'Screen Size':
                deviceScreenGet();
                break;
        }
    };

    function brancdGet(){
        loaderEvent.loaderActivate();
        overviewFactory.getDeviceBrandDataData(param).then(function(data, status) {
            $scope.deviceSectionData = data;
            loaderEvent.loaderDeactivate();
        });
    };

    function serviceGet(){
        loaderEvent.loaderActivate();
        overviewFactory.getDeviceServiceDataData(param).then(function(data, status) {
            $scope.deviceSectionData = data;
            loaderEvent.loaderDeactivate();
        });
    };

    function opSystemGet(){
        loaderEvent.loaderActivate();
        overviewFactory.getDeviceOpSystemDataData(param).then(function(data, status) {
            $scope.deviceSectionData = data;
            loaderEvent.loaderDeactivate();
        });
    };

    function deviceScreenGet(){
        loaderEvent.loaderActivate();
        overviewFactory.getDeviceScreenSizeDataData(param).then(function(data, status) {
            $scope.deviceSectionData = data;
            loaderEvent.loaderDeactivate();
        });
    };

    $rootScope.changeCampaignId = function(campaignId){
        sharedMain.campaign_id = campaignId;
        init();
    };

    function chartOptions(title, count) {
            var chartOptions = {
                chart: {
                    type: 'pieChart',
                    height: 210,
                    donut: true,
                    // donutRatio:.35,
                    x: function(d) {
                        return d.key;
                    },
                    y: function(d) {
                        return d.y;
                    },
                    valueFormat: (d3.format(".0f")),
                    color: sharedMain.colors,
                    showLabels: false,
                    showLegend: false,
                    title: title,
                    tooltip: {
                        contentGenerator: (function(obj) {
                            return '<span class="color-span pull-left" style="margin-top: 3px; border-color:' + obj.color + '"></span><span style="margin-left: 5px;">' + obj.data.key + '</span><span style="margin-left: 5px;"> ' + obj.data.y.toString() + '%</span>';
                        })
                    },
                    margin: { top: 0 }
                }
            };
            return chartOptions;
        }

    function chartNoDataOptions() {
        var chartOptions = {
            chart: {
                type: 'pieChart',
                height: 210,
                donut: true,
                x: function(d) {
                    return d.key;
                },
                y: function(d) {
                    return d.y;
                },
                valueFormat: (d3.format(".0f")),
                color: ['grey'],
                showLabels: false,
                config: [{ disabled: true }],
                showLegend: false,
                title: 'No Records',
                margin: { top: 0 },
                growOnHover: false
            }
        };
        return chartOptions;
    };

    function campaignDurationChartOptions(){
        var chartOptions = {
            chart: {
                type: 'pieChart',
                height: 280,
                donut: true,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                valueFormat: (d3.format(".0f")),
                color: sharedMain.colors,
                showLabels: false,
                showLegend: false,
                margin: {top: 0 },

                pie: {
                    startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                    endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
                }
            }
        };
        return chartOptions;
    };

        $scope.durationValue = [
                {
                    "date": "2012-01-01",
                    "distance": 227,
                    "townName": "New York",
                    "townName2": "New York",
                    "townSize": 25,
                    "latitude": 40.71,
                    "duration": 408
                }, {
                    "date": "2012-01-02",
                    "distance": 371,
                    "townName": "Washington",
                    "townSize": 14,
                    "latitude": 38.89,
                    "duration": 482
                }, {
                    "date": "2012-01-03",
                    "distance": 433,
                    "townName": "Wilmington",
                    "townSize": 6,
                    "latitude": 34.22,
                    "duration": 562
                }, {
                    "date": "2012-01-04",
                    "distance": 345,
                    "townName": "Jacksonville",
                    "townSize": 7,
                    "latitude": 30.35,
                    "duration": 379
                }, {
                    "date": "2012-01-05",
                    "distance": 480,
                    "townName": "Miami",
                    "townName2": "Miami",
                    "townSize": 10,
                    "latitude": 25.83,
                    "duration": 501
                }, {
                    "date": "2012-01-06",
                    "distance": 386,
                    "townName": "Tallahassee",
                    "townSize": 7,
                    "latitude": 30.46,
                    "duration": 443
                }, {
                    "date": "2012-01-07",
                    "distance": 348,
                    "townName": "New Orleans",
                    "townSize": 10,
                    "latitude": 29.94,
                    "duration": 405
                }, {
                    "date": "2012-01-08",
                    "distance": 238,
                    "townName": "Houston",
                    "townName2": "Houston",
                    "townSize": 16,
                    "latitude": 29.76,
                    "duration": 309
                }, {
                    "date": "2012-01-09",
                    "distance": 218,
                    "townName": "Dalas",
                    "townSize": 17,
                    "latitude": 32.8,
                    "duration": 287
                }, {
                    "date": "2012-01-10",
                    "distance": 349,
                    "townName": "Oklahoma City",
                    "townSize": 11,
                    "latitude": 35.49,
                    "duration": 485
                }, {
                    "date": "2012-01-11",
                    "distance": 603,
                    "townName": "Kansas City",
                    "townSize": 10,
                    "latitude": 39.1,
                    "duration": 890
                }, {
                    "date": "2012-01-12",
                    "distance": 534,
                    "townName": "Denver",
                    "townName2": "Denver",
                    "townSize": 18,
                    "latitude": 39.74,
                    "duration": 810
                }, {
                    "date": "2012-01-13",
                    "townName": "Salt Lake City",
                    "townSize": 12,
                    "distance": 425,
                    "duration": 670,
                    "latitude": 40.75,
                    "dashLength": 8,
                    "alpha": 0.4
                }, {
                    "date": "2012-01-14",
                    "latitude": 36.1,
                    "duration": 470,
                    "townName": "Las Vegas",
                    "townName2": "Las Vegas"
                }, {
                    "date": "2012-01-15"
                }, {
                    "date": "2012-01-16"
                }, {
                    "date": "2012-01-17"
                }, {
                    "date": "2012-01-18"
                }, {
                    "date": "2012-01-19"
                }];

    $scope.bulletChartValue = [ {
                  "valueField": "full",
                  "showBalloon": false,
                  "type": "column",
                  "lineAlpha": 0,
                  "fillAlphas": 0.8,
                  "fillColors": [ "#19d228", "#f6d32b", "#fb2316" ],
                  "gradientOrientation": "horizontal",
                }, {
                  "clustered": false,
                  "columnWidth": 0.3,
                  "fillAlphas": 1,
                  "lineColor": "#000000",
                  "stackable": false,
                  "type": "column",
                  "valueField": "bullet"
                }, {
                  "columnWidth": 0.5,
                  "lineColor": "#000000",
                  "lineThickness": 3,
                  "noStepRisers": true,
                  "stackable": false,
                  "type": "step",
                  "valueField": "limit"
                } ];

}]);