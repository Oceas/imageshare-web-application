angular.module('imageshare').directive('oceasRollView', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/stories/rollView.html',
        controller: 'oceasController'
    };
});