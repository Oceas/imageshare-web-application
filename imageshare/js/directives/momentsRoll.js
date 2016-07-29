angular.module('imageshare').directive('momentsRoll', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/moments/index.html',
        controller: 'momentsController'
    };
});