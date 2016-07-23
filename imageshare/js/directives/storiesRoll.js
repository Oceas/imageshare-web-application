angular.module('imageshare').directive('storiesRoll', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/storiesRoll/index.html',
        controller: 'storiesController'
    };
});