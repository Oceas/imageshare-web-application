angular.module('imageshare').controller('mainController', ['updateSystemSettings', 'getUsername', '$scope' ,'getUID', function (updateSystemSettings, getUsername, $scope,getUID) {
    // create a message to display in our view
    if (getUsername !== undefined) {
        $scope.username = getUsername();
        $scope.uid = getUID();
    }
    updateSystemSettings();
    $scope.message = 'Welcome to Imageshare the best story telling platform!';
}]);