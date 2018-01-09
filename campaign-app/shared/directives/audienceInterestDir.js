'use strict';
angular.module('MyApp').directive('crAudienceInterestDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/audienceInterest.html'
    }
});