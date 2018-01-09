'use strict';
angular.module('MyApp').directive('crTrafficDistributionDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/trafficDistribution.html'
    }
});