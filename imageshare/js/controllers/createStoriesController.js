angular.module('imageshare').controller('createStoriesController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {

    $scope.stories = {};

    $scope.createStory = function() {
        var data = $.param({
            userId: $rootScope.uid,
            storyName: $scope.storyName,
            storyDesc: $scope.storyDesc,
            location: $scope.location
        });

        console.log(data);

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/createstory.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert("Create Story: " + data.message);
                } else {
                    alert("Story Created!")
                }
            })
            .error(function () {

            });
    };

}]);