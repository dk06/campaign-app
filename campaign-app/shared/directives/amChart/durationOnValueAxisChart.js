
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
                            "type": "serial",
                            "theme": "light",
                            "legend": {
                                "equalWidths": false,
                                "useGraphSettings": true,
                                "valueAlign": "left",
                                "valueWidth": 120
                            },
                            "dataProvider": chartData,
                            "valueAxes": [{
                                "id": "distanceAxis",
                                "axisAlpha": 0,
                                "gridAlpha": 0,
                                "position": "left",
                                "title": "distance"
                            }, {
                                "id": "latitudeAxis",
                                "axisAlpha": 0,
                                "gridAlpha": 0,
                                "labelsEnabled": false,
                                "position": "right"
                            }, {
                                "id": "durationAxis",
                                "duration": "mm",
                                "durationUnits": {
                                    "hh": "h ",
                                    "mm": "min"
                                },
                                "axisAlpha": 0,
                                "gridAlpha": 0,
                                "inside": true,
                                "position": "right",
                                "title": "duration"
                            }],
                            "graphs": [{
                                "alphaField": "alpha",
                                "balloonText": "[[value]] miles",
                                "dashLengthField": "dashLength",
                                "fillAlphas": 0.7,
                                "legendPeriodValueText": "total: [[value.sum]] mi",
                                "legendValueText": "[[value]] mi",
                                "title": "distance",
                                "type": "column",
                                "valueField": "distance",
                                "valueAxis": "distanceAxis"
                            }, {
                                "balloonText": "latitude:[[value]]",
                                "bullet": "round",
                                "bulletBorderAlpha": 1,
                                "useLineColorForBulletBorder": true,
                                "bulletColor": "#FFFFFF",
                                "bulletSizeField": "townSize",
                                "dashLengthField": "dashLength",
                                "descriptionField": "townName",
                                "labelPosition": "right",
                                "labelText": "[[townName2]]",
                                "legendValueText": "[[value]]/[[description]]",
                                "title": "latitude/city",
                                "fillAlphas": 0,
                                "valueField": "latitude",
                                "valueAxis": "latitudeAxis"
                            }, {
                                "bullet": "square",
                                "bulletBorderAlpha": 1,
                                "bulletBorderThickness": 1,
                                "dashLengthField": "dashLength",
                                "legendValueText": "[[value]]",
                                "title": "duration",
                                "fillAlphas": 0,
                                "valueField": "duration",
                                "valueAxis": "durationAxis"
                            }],
                            "chartCursor": {
                                "categoryBalloonDateFormat": "DD",
                                "cursorAlpha": 0.1,
                                "cursorColor":"#000000",
                                 "fullWidth":true,
                                "valueBalloonsEnabled": false,
                                "zoomable": false
                            },
                            "dataDateFormat": "YYYY-MM-DD",
                            "categoryField": "date",
                            "categoryAxis": {
                                "dateFormats": [{
                                    "period": "DD",
                                    "format": "DD"
                                }, {
                                    "period": "WW",
                                    "format": "MMM DD"
                                }, {
                                    "period": "MM",
                                    "format": "MMM"
                                }, {
                                    "period": "YYYY",
                                    "format": "YYYY"
                                }],
                                "parseDates": true,
                                "autoGridCount": false,
                                "axisColor": "#555555",
                                "gridAlpha": 0.1,
                                "gridColor": "#FFFFFF",
                                "gridCount": 50
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