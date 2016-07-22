angular.module('imageshare').directive('photosRoll', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/photosRoll/index.html',
        controller: 'photosController'
    };
});