angular.module('imageshare').directive('photoUpload', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/photos/upload.html',
        controller: 'photosController'
    };
});