'use strict';
angular.module('MyApp').directive('crAudienceProfileDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/audienceProfile.html'
    }
});
