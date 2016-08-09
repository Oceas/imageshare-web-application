angular.module('imageshare').controller('accountController', ['$rootScope', '$scope','getUsername', function ($rootScope, $scope, getUsername) {

    $scope.username = getUsername();


}]);