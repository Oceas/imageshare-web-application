angular.module('imageshare').controller('logOutController', ['$scope', 'deleteCredentials', function ($scope, deleteCredentials) {
    $scope.message = 'You are now logged out!';
    deleteCredentials();
}]);