angular.module('imageshare').directive('navigationMenu', function () {
    return {
        restrict: 'E',
        templateUrl: '../../partials/navigation/menu.html',
        controller: 'navigationController'
    };
});