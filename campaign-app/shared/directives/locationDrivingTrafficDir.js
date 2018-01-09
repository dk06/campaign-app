'use strict';
angular.module('MyApp').directive('crLocationDrivingTrafficDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/locationDrivingTraffic.html'
    }
});