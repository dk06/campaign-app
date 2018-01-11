
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
                          "pathToImages": "http://www.amcharts.com/lib/3/images/",
                          "type": "serial",
                          "rotate": true,
                          "theme": "light",
                          "colors": sharedMain.colors,
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
                              // "limit": chartData.bullet,
                              "full":  chartData.cpp,
                              "bullet": chartData.reach
                            } ],
                            "valueAxes": [ {
                              "maximum": chartData.bullet,
                              "stackType": "regular",
                              "gridAlpha": 0
                            } ],
                            "startDuration": 1,
                            "graphs": [ {
                              "valueField": "full",
                              "showBalloon": false,
                              "type": "column",
                              "lineAlpha": 0,
                              "fillAlphas": 0.8,
                              "fillColors": [ "#04b1fb" ],
                              "gradientOrientation": "horizontal",
                            }, {
                              "clustered": false,
                              "columnWidth": 0.3,
                              "fillAlphas": 1,
                              "lineColor": "#b1e8ef",
                              "stackable": false,
                              "type": "column",
                              "valueField": "bullet"
                            }, {
                              "columnWidth": 0.5,
                              "lineColor": "#b1e8ef",
                              "lineThickness": 3,
                              "noStepRisers": true,
                              "stackable": false,
                              "type": "step",
                              "valueField": "limit"
                            } ],
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