'use strict';
angular.module('MyApp').directive('crHeaderDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/header.html'
    }
});