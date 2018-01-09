'use strict';
angular.module('MyApp').directive('crAudienceLevelDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/audiencelevel.html'
    }
});