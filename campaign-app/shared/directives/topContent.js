'use strict';
angular.module('MyApp').directive('crTopContentDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/topContent.html'
    }
});