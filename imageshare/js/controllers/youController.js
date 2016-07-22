angular.module('imageshare').controller('youController', ['$scope',function ($scope) {

    //default view to moments
    $scope.selected = 1;

    $scope.setSelected = function(view){
        $scope.selected = view;
    }

    $scope.isSelected = function(view){
        return $scope.selected == view;
    }

}]);