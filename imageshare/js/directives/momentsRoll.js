angular.module('imageshare').directive('momentsRoll', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/momentsRoll/index.html',
        controller: 'momentsController'
    };
});