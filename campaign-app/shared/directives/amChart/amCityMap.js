(function (window) {
    'use strict';
    angular.module("MyApp").directive('crAnalyticCityMap', [
        'sharedMain',
        '$timeout',
        function (sharedMain, $timeout) {
            return {
                restrict: 'E',
                replace:true,

                template: '<div id="cityMapDiv" style="min-width: 100%; height: 467px; margin: 0 auto"></div>',
                link: function (scope, element, attrs) {

                    var stateMap = false;

                    var initChart = function(chartData) {
                        if (stateMap) stateMap.destroy();
                        var config = scope.config || {};
                        stateMap = AmCharts.makeChart("cityMapDiv", {
                            "pathToImages": "http://www.amcharts.com/lib/3/images/",
                            "type": "map",
                            // "projection": "winkel3",
                            "theme": "light",
                            "areasSettings": {
                                "autoZoom": true,
                                "rollOverOutlineColor": "#FFFFFF",
                                "rollOverColor": "#CC0000",
                                "unlistedAreasAlpha": 0.1,
                                "balloonText": "[[title]] : [[value]] %"
                            },
                            "dataProvider": {
                                "map": "worldLow",
                                "zoomLevel": 3.5,
                                "zoomLongitude": 78.9629,
                                "zoomLatitude": 20.5937,
                                "images": chartData
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    };
                    scope.$on("cityViewMap", function (data,en ) {
                        angular.forEach(en.data, function(item){
                            item.zoomLevel= 5;
                            item.scale =  0.5;
                            item.type = "circle";
                            item.color= "rgb(13, 142, 207)";
                            item.width = 25;
                            item.height = 25;
                        });
                        initChart(en.data);
                    });

                }//end watch
            }
        }]) ;
})(window);







