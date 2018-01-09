'use strict';
angular.module('MyApp').directive('crTrafficSourcesDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/trafficSources.html'
    }
});