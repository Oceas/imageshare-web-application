angular.module('imageshare').directive('storyCreate', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/pages/stories/create.html',
        controller: 'createStoriesController'
    };
});