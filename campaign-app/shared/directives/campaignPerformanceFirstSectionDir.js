'use strict';
angular.module('MyApp').directive('crCampaignPerformanceFirstSectionDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/campaignPerformanceFirstSection.html'
    }
});