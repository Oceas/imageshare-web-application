angular.module('imageshare').directive('photosRoll', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/photos/index.html',
        controller: 'photosController'
    };
});