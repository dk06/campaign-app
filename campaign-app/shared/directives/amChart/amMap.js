(function (window) {
    'use strict';
    angular.module("MyApp").directive('crAnalyticCountriesMap', [
        'sharedMain',
        function (sharedMain) {
            return {
                restrict: 'E',
                replace:true,

                template: '<div id="countriesMapDiv" style="min-width: 100%; height: 467px; margin: 0 auto"></div>',
                link: function (scope, element, attrs) {

                    var chart = false;
                    var initChart = function(chartData) {
                        if (chart) chart.destroy();
                        var config = scope.config || {};
                        chart = AmCharts.makeChart("countriesMapDiv", {
                            "pathToImages": "http://www.amcharts.com/lib/3/images/",
                            "type": "map",
                            "theme": "light",
                            "dataProvider": {
                                "map": "worldIndiaLow",
                                "zoomLevel": 3.5,
                                "zoomLongitude": 78.9629,
                                "zoomLatitude": 20.5937,
                                "areas": chartData
                            },

                            "areasSettings": {
                                "rollOverOutlineColor": "#FFFFFF",
                                "rollOverColor": "#CC0000",
                                "unlistedAreasAlpha": 0.1,
                                "balloonText": "[[title]] : [[value]] %"
                            },


                            "legend": {
                                "width": "100%",
                                "marginRight": 27,
                                "marginLeft": 27,
                                "equalWidths": false,
                                "backgroundAlpha": 0.5,
                                "backgroundColor": "#FFFFFF",
                                "borderColor": "#ffffff",
                                "borderAlpha": 1,
                                "top": 450,
                                "left": 0,
                                "horizontalGap": 10,
                            },
                            "export": {
                                "enabled": true
                            }
                        });


                    };
                    
                    scope.$on("countriesViewMap", function (data,en ) {
                        initChart(en.data);
                    });

                }//end watch
            }
        }]) ;
})(window);







