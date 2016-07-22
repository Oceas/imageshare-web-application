angular.module('imageshare').controller('youController', ['$scope',function ($scope) {

    //default view to moments
    $scope.selection = "moments";

    $scope.setSelected = function(view){
        $scope.selection = view;
    };

    $scope.isSelected = function(view){
        return $scope.selection == view;
    };

}]);