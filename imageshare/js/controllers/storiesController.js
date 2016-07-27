angular.module('imageshare').controller('storiesController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {

    $scope.stories = {};

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
                    $scope.stories.forEach(loadMoments);
                    console.log("Loading Stories");
                    console.log(data);
                    // $scope. = data.albums;
                    // $scope.moments.forEach(loadPhotos);
                }
            })
            .error(function () {

            });
    };


    var loadMoments = function(story, index) {
        var data = $.param({
            userId: $rootScope.uid,
            storyId: story.storyId
        });
    
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/getstorydetail.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert(data.message);
                } else {
                    $scope.stories[index].moments = data.moments;
                }
                console.log(data);
            })
            .error(function () {
                console.log("ERROR!");
            });
    };


    var loadPhotos = function(moment, index) {
        var data = $.param({
            userId: $rootScope.uid,
            albumId: moment.albumId
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/getalbumdetail.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert(data.message);
                } else {
                    $scope.moments[index].images = data.album.images;
                    console.log("Loaded photos for " + moment.albumName);
                }
                console.log(data);
            })
            .error(function () {
                console.log("ERROR!");
            });
    };

    loadStories();

}]);