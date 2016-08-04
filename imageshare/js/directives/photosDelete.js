angular.module('imageshare').directive('photosDelete', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/photos/delete.html',
        controller: 'photosController'
    };
});