'use strict';
angular.module('MyApp').directive('crDeviceAndBrandDir', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'shared/views/deviceAndBrand.html'
    }
});