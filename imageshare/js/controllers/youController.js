angular.module('imageshare').controller('youController', ['$scope',function ($scope) {

    //default view to moments
    $scope.selection = "photos";

    $scope.setSelected = function(view){
        $scope.selection = view;
    }

    $scope.isSelected = function(view){
        return $scope.selection == view;
    }

}]);