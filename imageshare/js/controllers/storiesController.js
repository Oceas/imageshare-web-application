angular.module('imageshare').controller('storiesController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {

    $scope.stories = {};

    $scope.createStory = function() {
        var data = $.param({
            userId: $rootScope.uid,
            storyName: $scope.storyName,
            storyDesc: $scope.storyDesc,
            location: $scope.location
        });

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
                    console.log(data);
                    alert("Story Created!")
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
                    $scope.stories.forEach(loadMoments);

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

        console.log("Loading photos for albumID" + moment.albumId + " stored in story index"+ storyIndex + " in moment index" + momentIndex);

        console.log("Loading Photos");
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
                    $scope.stories[storyIndex].moments[momentIndex].images = data.album.images;
                }
            })
            .error(function () {
                console.log("ERROR!");
            });
    };


    loadStories();

}]);