angular.module('imageshare').directive('photoUpload', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/photosRoll/upload.html',
        controller: 'photosController'
    };
});