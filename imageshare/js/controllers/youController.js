angular.module('imageshare').controller('youController', ['$scope',function ($scope) {

    //default view to moments
    $scope.selection = "stories";
    $scope.mode = "view";


    $scope.setSelected = function(view){
        $scope.selection = view;
    };

    $scope.isSelected = function(view){
        return $scope.selection == view;
    };

    $scope.setMode = function(view){
        $scope.mode = view;
    };

    $scope.isMode = function(view){
        return $scope.mode == view;
    };

}]);