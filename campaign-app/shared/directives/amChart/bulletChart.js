
(function (window) {
    'use strict';
    angular.module("MyApp").directive('crBulletChart', [
        'sharedMain',
        function (sharedMain) {
            return {
                restrict: 'E',
                replace:true,

                template: '<div id="bulletChartDiv" style="min-width: 100%; height: 140px; margin: 0 auto"></div>',
                link: function (scope, element, attrs) {

                    var chart = false;
                    var initChart = function(chartData) {
                        if (chart) chart.destroy();
                        var config = scope.config || {};
                        var chart = AmCharts.makeChart("bulletChartDiv", {
                            "type": "serial",
                            "rotate": true,
                            "theme": "light",
                            "autoMargins": false,
                            "marginTop": 30,
                            "marginLeft": 10,
                            "marginBottom": 30,
                            "marginRight": 10,
                            "dataProvider": [ {
                              "category": "",
                              "excelent": 20,
                              "good": 20,
                              "average": 20,
                              "poor": 20,
                              "bad": 20,
                              "limit": 78,
                              "full": 100,
                              "bullet": 65
                            } ],
                            "valueAxes": [ {
                              "maximum": 100,
                              "stackType": "regular",
                              "gridAlpha": 0
                            } ],
                            "startDuration": 1,
                            "graphs": chartData,
                            "columnWidth": 1,
                            "categoryField": "category",
                            "categoryAxis": {
                              "gridAlpha": 0,
                              "position": "left"
                            }
                        });
                    };
                    scope.$on("bulletChart", function (data,en ) {
                        initChart(en.data);
                    });

                }//end watch
            }
        }]) ;   
})(window);