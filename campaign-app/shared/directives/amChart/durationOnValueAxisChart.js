
(function (window) {
    'use strict';
    angular.module("MyApp").directive('crDurationOnValueAxisChart', [
        'sharedMain',
        function (sharedMain) {
            return {
                restrict: 'E',
                replace:true,

                template: '<div id="chartdiv" style="min-width: 100%; height: 350px; margin: 0 auto"></div>',
                link: function (scope, element, attrs) {

                    var chart = false;
                    var initChart = function(chartData) {

                        if (chart) chart.destroy();
                        var config = scope.config || {};
                        var chart = AmCharts.makeChart("chartdiv", {
                            "pathToImages": "http://www.amcharts.com/lib/3/images/",
                            "type": "stock",
                            "theme": "light",
                            "colors": sharedMain.colors,
                            "dataSets": [ {
                                  "title": "Performance",
                                  "fieldMappings": [ {
                                    "fromField": "value",
                                    "toField": "value"
                                  }, {
                                    "fromField": "volume",
                                    "toField": "volume"
                                  } ],
                                  "dataProvider": chartData,
                                  "categoryField": "date"
                                }
                              ],

                                "panels": [ {
                                "showCategoryAxis": false,
                                "title": "Value",
                                "percentHeight": 50,
                                "stockGraphs": [ {
                                  "id": "g1",
                                  "valueField": "value",
                                  "comparable": false,
                                  "compareField": "value",
                                  "balloonText": "[[title]]:<b>[[value]]</b>",
                                  "compareGraphBalloonText": "[[title]]:<b>[[value]]</b>"
                                } ],
                                "stockLegend": {
                                  "periodValueTextComparing": " [[percents.value.close]]%",
                                  "periodValueTextRegular": "[[value.close]]"
                                }
                              }, {
                                
                                "stockGraphs": [ {
                                  "valueField": "volume",
                                  "type": "column",
                                  "showBalloon": true,
                                  "fillAlphas": 1
                                } ]
                              } ],

                              "chartCursorSettings": {
                                "valueBalloonsEnabled": true,
                                "fullWidth": true,
                                "cursorAlpha": 0.1,
                                "valueLineBalloonEnabled": true,
                                "valueLineEnabled": true,
                                "valueLineAlpha": 0.5
                              },
                              "export": {
                                "enabled": true
                              }
                        });
                    };
                    scope.$on("durationOnValueAxisChart", function (data,en ) {                       
                        initChart(en.data);
                    });

                }//end watch
            }
        }]) ;   
})(window);