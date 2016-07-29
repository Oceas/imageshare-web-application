angular.module('imageshare').directive('storiesRoll', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/stories/index.html',
        controller: 'storiesController'
    };
});