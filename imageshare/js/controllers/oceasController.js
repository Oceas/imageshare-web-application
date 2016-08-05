angular.module('imageshare').controller('oceasController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {

    $scope.stories = {};


    var loadStories = function() {
        var data = $.param({
            userId: "3",
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
                }
            })
            .error(function () {

            });
    };


    var loadMoments = function(story, index) {
        var data = $.param({
            userId: "3",
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
                    $scope.stories[index].moments = data.story.momments;

                    for (var momentIndex = 0; momentIndex < $scope.stories[index].moments.length; momentIndex++){
                        loadPhotos(index,$scope.stories[index].moments[momentIndex],momentIndex);
                    }
                }
            })
            .error(function () {

            });
    };

    var loadPhotos = function(storyIndex, moment, momentIndex) {

        var data = $.param({
            userId: "3",
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
                    $scope.stories[storyIndex].moments[momentIndex].images = data.album.images;
                }
            })
            .error(function () {
                console.log("ERROR!");
            });
    };


    loadStories();

}]);