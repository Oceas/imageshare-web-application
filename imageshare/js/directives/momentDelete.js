angular.module('imageshare').directive('momentDelete', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/moments/delete.html',
        controller: 'momentsController'
    };
});