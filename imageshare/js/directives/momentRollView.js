angular.module('imageshare').directive('momentRollView', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/moments/rollView.html',
        controller: 'momentsController'
    };
});