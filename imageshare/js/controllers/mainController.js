angular.module('imageshare').controller('mainController', ['updateSystemSettings', 'getUsername', '$scope', function (updateSystemSettings, getUsername, $scope) {
    // create a message to display in our view
    if (getUsername !== undefined) {
        $scope.username = getUsername();
    }
    updateSystemSettings();
    $scope.message = 'Welcome to Imageshare the best story telling platform!';
}]);