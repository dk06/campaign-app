'use strict';
angular.module('MyApp').directive('crChannelPerformanceDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/channelPerformance.html'
    }
});