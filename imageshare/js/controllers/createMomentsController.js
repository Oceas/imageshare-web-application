angular.module('imageshare').controller('createMomentsController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {
    $scope.moments = {};

    $scope.stories = {};


    $scope.createMoment = function() {
        var data = $.param({
            userId: $rootScope.uid,
            albumName: $rootScope.albumName,
            albumDesc: $scope.albumDesc,
            location: $scope.location
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/createalbum.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert("Create Moment: " + data.message);
                } else {
                    console.log(data);
                    addMomentToSory(data.albumId,$scope.storySelection);
                    alert("Moment Created!")
                }
            })
            .error(function () {

            });
    };

    var addMomentToSory = function (moment, story){
        var data = $.param({
            userId: $rootScope.uid,
            storyId: story,
            albumId: moment
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/addalbumtostory.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert("Moments: " + data.message);
                } else {
                    console.log(data);
                }
            })
            .error(function () {

            });
    };



    var loadStories = function() {
        var data = $.param({
            userId: $rootScope.uid,
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/getstories.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert("Stories: " + data.message);
                } else {
                    $scope.stories = data.stories;
                }
            })
            .error(function () {

            });
    };


    loadStories();

}]);