app.controller('overviewController',['$scope','$rootScope','overviewFactory', '$window','$location','sharedMain','loaderEvent','$filter','$timeout', function($scope, $rootScope, overviewFactory, $window,$location, sharedMain, loaderEvent, $filter,$timeout) {

    $scope.loactionType = 'City';
    $rootScope.companyDropDownEvent = true;
    $scope.campaignObject = 'All Campaigns';
    $scope.dateSet = '01/01/2016 - 31/01/2017';
    $scope.companyObject = 'All Channels';
    $scope.targetSegment = 'CVR';

    $scope.targetSegmentData = [{'targetName' :  'CVR'},{'targetName' :  'CPC'}, {'targetName' :  'CTR'}]

    $scope.campaignObjectList = [{'dropdown' : 'All'},{'dropdown' : 'Adwords'},{'dropdown' : 'Facebook'},{'dropdown' : 'DBM'}]

    var param = {};
        param.dateRange =  sharedMain.dateRange ? sharedMain.dateRange : '2016-01-01_2017-01-31';
        param.campaign_id = sharedMain.campaign_id ? sharedMain.campaign_id : '12721';
        param.aggregated = true;
        param.channel = sharedMain.channel ? sharedMain.channel : 'all';
        param.channelAll = 'all';
        param.metric = 'impression';
        param.targetName = 'CVR';
        param.targetCampaign_id ='6043097399059';
        param.details = false;
   

    $scope.setDateRange = function(){
        var datadate = document.getElementById("daterange").value;
        var dateRangeArray = datadate.split('-');

        var startDate = $filter('date')(new Date(dateRangeArray[0]), 'yyyy-MM-dd');
        var endDate = $filter('date')(new Date(dateRangeArray[1]), 'yyyy-MM-dd');

        sharedMain.dateRange = startDate + '_' + endDate;
        param.dateRange = startDate + '_' + endDate;
        init();
    };

    $window.scrollTo(0, angular.element(document.getElementById('scrollTop')).offsetTop);

	init();
    function init() {
        if ($window.localStorage.accessToken) {
            loaderEvent.loaderActivate();

            var dateRange = '2016-01-01,2017-01-31';
            overviewFactory.getCompanyList(dateRange).then(function(response, status){                
                $rootScope.companyList = response;
                sharedMain.campaign_id = response[0].campaign_id;
            });

            overviewFactory.getChannelsData(param).then(function(data, status) {
                $scope.channelData = data;
            });

            overviewFactory.getDurationOnValueAxisChart(param).then(function(data, status) {                
                $scope.$broadcast('durationOnValueAxisChart', { data: data });
            });

            overviewFactory.getbulletChartData(param).then(function(data, status) {                
                $scope.bulletChartData =  data;
                $scope.$broadcast('bulletChart', { data: data[0] });
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

            overviewFactory.getAudienceSegement(param).then(function(data, status) {
                $scope.audienceSegment = data;
                expandTable();
                if ($scope.audienceSegment && $scope.audienceSegment) {
                    removedTablesRow($scope.audienceSegment);
                }
                //$scope.audienceSegment = data;
                var filterData = _.filter($scope.audienceSegment, function (item, index) {
                    return 0 <= index && 9 >= index;
                });
                manageTableData(filterData);
            });

            // overviewFactory.bestPerformingTargetSum(param).then(function(data, status) {
            //     $scope.bestPerformingTargetSumData = data;
            //     $scope.targetCampaign_id = data.responseData[0].campaign_id;
            // });

            overviewFactory.bestPerformingForGender(param).then(function(data, status) {
                $scope.bestPerformingGenderData = data;
            });

            overviewFactory.bestPerformingAgeGroup(param).then(function(data, status) {
                $scope.bestPerformingAgeData = data;
            });

            overviewFactory.bestPerformingForCity(param).then(function(data, status) {
                $scope.bestPerformingCityData = data;
            });

            overviewFactory.bestPerformingForDevice(param).then(function(data, status) {
                $scope.bestPerformingDeviceData = data;
            });

            overviewFactory.bestPerformingSegment(param).then(function(data, status) {
                $scope.bestPerformingSegmentData = data;
            });

            $timeout(function(){
                //$('[data-toggle="tooltip"]').tooltip();
                loaderEvent.loaderDeactivate();
            },500);
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

     $scope.campaignObjectFitler = function(filter){
        $scope.campaignObject = filter;
        sharedMain.channel = filter;
        param.channel = filter;
        init();
    };

    $rootScope.changeCampaignId = function(campaignId,campaign_name){
        sharedMain.campaign_id = campaignId;
        param.campaign_id = campaignId;
        $scope.companyObject = campaign_name;
        sharedMain.campaign_name = campaign_name;
        init();
    };


    function expandTable() {
            $("#example-advanced").treetable({ expandable: true });
        }

        function removedTablesRow(list) {
            var len = list.length;
            // Clear the table data.
            for (var i = 0; i < len; i++) {
                var node = $("#example-advanced").treetable("node", i + 1);
                if (undefined != node) {
                    $("#example-advanced").treetable("removeNode", (i + 1)); // Remove the node and it's children.
                }
            }
        }

        function manageTableData(responseData) {
            var totalParentCountSum = _.reduce(_.pluck(responseData, 'count'), function(memo, num) {
                return parseInt(memo) + parseInt(num);
            }, 0);
            _.each(responseData, function(parentItem, index) {
                var data1 = manageAudienceSegmentData(parentItem, totalParentCountSum);
                data1.id = (index + 1).toString();
                data1.parentData = true;
                if (parentItem.audience_segment_data != undefined) {
                    if (parentItem.audience_segment_data.length == 0) {
                        data1.endData = true;
                    }
                }
                manageAudienceSegmentHtml(data1, data1.id);
                if (parentItem.audience_segment_data != undefined) {
                    if (parentItem.audience_segment_data.length > 0) {
                        var totalChildCountSum = _.reduce(_.pluck(parentItem.audience_segment_data, 'count'), function(memo, num) {
                            return parseInt(memo) + parseInt(num);
                        }, 0);
                        _.each(parentItem.audience_segment_data, function(firstChild, index1) {
                            var data2 = manageAudienceSegmentData(firstChild, totalChildCountSum);
                            data2.id = (index + 1).toString() + '-' + (index1 + 1).toString();
                            data2.parentId = (index + 1).toString();
                            if (firstChild.audience_segment_data != undefined) {
                                if (firstChild.audience_segment_data.length == 0) {
                                    data2.endData = true;
                                    data2.padding = 30;
                                }
                            }
                            manageAudienceSegmentHtml(data2, data2.parentId);
                            if (firstChild.audience_segment_data != undefined) {
                                if (firstChild.audience_segment_data.length > 0) {
                                    var totalSecondChildCountSum = _.reduce(_.pluck(firstChild.audience_segment_data, 'count'), function(memo, num) {
                                        return parseInt(memo) + parseInt(num);
                                    }, 0);
                                    _.each(firstChild.audience_segment_data, function(secondChild, index2) {
                                        var data3 = manageAudienceSegmentData(secondChild, totalSecondChildCountSum);
                                        data3.id = (index + 1).toString() + '-' + (index1 + 1).toString() + '-' + (index2 + 1).toString();
                                        data3.parentId = (index + 1).toString() + '-' + (index1 + 1).toString();
                                        if (secondChild.audience_segment_data != undefined) {
                                            if (secondChild.audience_segment_data.length == 0) {
                                                data3.endData = true;
                                                data3.padding = 35;
                                            }
                                        }
                                        manageAudienceSegmentHtml(data3, data3.parentId);
                                        if (secondChild.audience_segment_data != undefined) {
                                            if (secondChild.audience_segment_data.length > 0) {
                                                var totalThirdChildCountSum = _.reduce(_.pluck(secondChild.audience_segment_data, 'count'), function(memo, num) {
                                                    return parseInt(memo) + parseInt(num);
                                                }, 0);
                                                _.each(secondChild.audience_segment_data, function(thirdChild, index3) {
                                                    var data4 = manageAudienceSegmentData(thirdChild, totalThirdChildCountSum);
                                                    data4.id = (index + 1).toString() + '-' + (index1 + 1).toString() + '-' + (index2 + 1).toString() + '-' + (index3 + 1).toString();
                                                    data4.parentId = (index + 1).toString() + '-' + (index1 + 1).toString() + '-' + (index2 + 1).toString();
                                                    if (thirdChild.audience_segment_data != undefined) {
                                                        if (thirdChild.audience_segment_data.length == 0) {
                                                            data4.endData = true;
                                                            data4.padding = 40;
                                                        }
                                                    }
                                                    manageAudienceSegmentHtml(data4, data4.parentId);
                                                    if (thirdChild.audience_segment_data != undefined) {
                                                        if (thirdChild.audience_segment_data.length > 0) {
                                                            var totalFourthChildCountSum = _.reduce(_.pluck(thirdChild.audience_segment_data, 'count'), function(memo, num) {
                                                                return parseInt(memo) + parseInt(num);
                                                            }, 0);
                                                            _.each(thirdChild.audience_segment_data, function(fourthChild, index4) {
                                                                var data5 = manageAudienceSegmentData(fourthChild, totalFourthChildCountSum);
                                                                data5.id = (index + 1).toString() + '-' + (index1 + 1).toString() + '-' + (index2 + 1).toString() + '-' + (index3 + 1).toString() + '-' + (index4 + 1).toString();
                                                                data5.parentId = (index + 1).toString() + '-' + (index1 + 1).toString() + '-' + (index2 + 1).toString() + '-' + (index3 + 1).toString();
                                                                if (fourthChild.audience_segment_data != undefined) {
                                                                    if (fourthChild.audience_segment_data.length == 0) {
                                                                        data5.endData = true;
                                                                        data5.padding = 45;
                                                                    }
                                                                }
                                                                manageAudienceSegmentHtml(data5, data5.parentId);
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }

                $("#example-advanced").treetable("collapseAll");

            });
        }

        function manageAudienceSegmentData(data, totalCount) {
            return {
                'type': data.audience_segment,
                'conversions' : data.conversions,
                'actions': '-',
                'impressions' : data.impressions,
                'count': data.reach,
                'share': parseInt(data.impressions),
                'scaledShare' : parseInt(data.impressions),
                'audienceSegmentCode' : data.cuberootcampaignId
            };
        }

        function audienceSegmentTree(event) {
            var type = 'segmentDetails';
            $scope.goToOtherPages(type, event);
        }
        function manageAudienceSegmentHtml(dataItem, index) {
            var node = $("#example-advanced").treetable("node", index);
            var tabId = 'treeSpan' + dataItem.id;
            if (dataItem.parentData) {
                $("#example-advanced").treetable("loadBranch", node,
                    '<tr data-tt-id="' + dataItem.id + '" class="leaf collapsed odd text-left"><td style="cursor: pointer;"><span class="indenter" style="padding-left: 0px;"></span><span id="'+tabId +'">' + dataItem.type + '</span></td> <td class=" text-bold">' + dataItem.conversions + '</td><td class=" text-bold">' + dataItem.actions + '</td> <td class=" text-bold">' + dataItem.impressions + '</td><td class=" text-bold">' + dataItem.count + '</td><td class="col-lg-3" style="width:100px;"><div class="progress" data-toggle="tooltip" data-placement="top" title="' + dataItem.share + '%"><div class="progress-bar" style="width: ' + dataItem.scaledShare + '%;"><span class="sr-only"></span></div></div></td></tr>'
                );
            } else if (dataItem.endData) {
                $("#example-advanced").treetable("loadBranch", node, '<tr data-tt-id="' + dataItem.id + '" data-tt-parent-id="' + dataItem.parentId + '" class="branch collapsed odd text-left " style="display: none; color:#777676;"> <td style="cursor: pointer;"><span class="indenter" style="padding-left: 0px;"></span><span id="'+tabId +'" style="padding-left:' + dataItem.padding + 'px;">' + dataItem.type + '</span></td> <td class=" text-bold">' + dataItem.conversions + '</td><td class=" text-bold">' + dataItem.actions + '</td><td class=" text-bold">' + dataItem.impressions + '</td><td class=" text-bold">' + dataItem.count + '</td><td class="col-lg-3" style="width:100px;"><div class="progress" data-toggle="tooltip" data-placement="top" title="' + dataItem.share + '%"><div class="progress-bar" style="width: ' + dataItem.scaledShare + '%;"><span class="sr-only"></span></div></div></td></tr>');
            } else {
                $("#example-advanced").treetable("loadBranch", node, '<tr data-tt-id="' + dataItem.id + '" data-tt-parent-id="' + dataItem.parentId + '" class="branch collapsed odd text-left" style="display: none; color:#777676;"> <td style="cursor: pointer;"><span class="indenter" style="padding-left: 0px;"></span><span id="'+tabId +'" style="margin-left : 20px;">' + dataItem.type + '</span></td> <td class=" text-bold">' + dataItem.conversions + '</td><td class=" text-bold">' + dataItem.actions + '</td><td class=" text-bold">' + dataItem.impressions + '</td><td class=" text-bold">' + dataItem.count + '</td><td class="col-lg-3" style="width:100px;"><div class="progress" data-toggle="tooltip" data-placement="top" title="' + dataItem.share + '%"><div class="progress-bar" style="width: ' + dataItem.scaledShare + '%;"><span class="sr-only"></span></div></div></td></tr>');
            }
            // $timeout(function() {
            //     $('[data-toggle="tooltip"]').tooltip();
            //     $('#'+tabId).bind("click",
            //         dataItem,
            //         audienceSegmentTree);
            // }, 500);
        }



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
                height: 167,
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


    $scope.channelViewButton = function(){
        param.aggregated = false;
        loaderEvent.loaderActivate();
        overviewFactory.getChannelsData(param).then(function(data, status) {
            $scope.channelData = data;
            loaderEvent.loaderDeactivate();
        });

    };

    $scope.segmentViewButton = function(){
        param.aggregated = false;
        loaderEvent.loaderActivate();
        overviewFactory.getAudienceSegement(param).then(function(data, status) {
            $scope.audienceSegment = data;
            expandTable();
            if ($scope.audienceSegment && $scope.audienceSegment) {
                removedTablesRow($scope.audienceSegment);
            }
            //$scope.audienceSegment = data;
            var filterData = _.filter($scope.audienceSegment, function (item, index) {
                return 0 <= index && 9 >= index;
            });
            manageTableData(filterData);
            loaderEvent.loaderDeactivate();
        });

    };

    $scope.audienceProfileViewButton = function(){
        param.aggregated = false;
        loaderEvent.loaderActivate();
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
            loaderEvent.loaderDeactivate();
        });


    };

    $scope.loactionWiseViewButton = function(){
        param.aggregated = false;
        loaderEvent.loaderActivate();
        overviewFactory.cityData(param).then(function(data, status) {
            $scope.cityData = data;
            $scope.loactionType = 'City';
            $scope.$broadcast('cityViewMap', { data: data });
            loaderEvent.loaderDeactivate();
        });

    };

    $scope.deviceAndBrandViewButton = function(){
        param.aggregated = false;
        loaderEvent.loaderActivate();
        overviewFactory.getDeviceBrandDataData(param).then(function(data, status) {
            $scope.brandName = 'Brand';
            $scope.deviceSectionData = data;
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.targetSegmentChange = function(targetName){
        $scope.targetSegment = targetName;
        loaderEvent.loaderActivate();
        param.targetName = targetName;
        if (targetName == 'CVR') {
            param.targetCampaign_id = '6043097399059';
        }else if (targetName == 'CPC') {
            param.targetCampaign_id = '6043097399059';
        }else if (targetName == 'CTR') {
            param.targetCampaign_id = '390878914';
        }
        
        overviewFactory.bestPerformingForGender(param).then(function(data, status) {
            $scope.bestPerformingGenderData = data;
        });

        overviewFactory.bestPerformingAgeGroup(param).then(function(data, status) {
            $scope.bestPerformingAgeData = data;
        });

        overviewFactory.bestPerformingForCity(param).then(function(data, status) {
            $scope.bestPerformingCityData = data;
        });

        overviewFactory.bestPerformingForDevice(param).then(function(data, status) {
            $scope.bestPerformingDeviceData = data;
        });

        overviewFactory.bestPerformingSegment(param).then(function(data, status) {
            $scope.bestPerformingSegmentData = data;
        });
    };

}]);