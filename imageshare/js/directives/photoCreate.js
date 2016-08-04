angular.module('imageshare').directive('photoUpload', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/photos/create.html',
        controller: 'createPhotosController'
    };
});