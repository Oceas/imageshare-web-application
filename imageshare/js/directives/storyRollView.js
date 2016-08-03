angular.module('imageshare').directive('storyRollView', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/stories/storyRollView.html',
        controller: 'storiesController'
    };
});