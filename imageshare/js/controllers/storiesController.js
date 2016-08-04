angular.module('imageshare').controller('storiesController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {

    $scope.stories = {};

    var storiesToDelete = {};

    $scope.setToBeDeleted = function(story){
        if(storiesToDelete[story]){
            storiesToDelete[story] = false;
        }else{
            storiesToDelete[story] = true;
        }
    };

    $scope.isToBeDeleted = function(story){
        return storiesToDelete[story] == true;
    };

    $scope.delete = function(){
        for(var storyId in storiesToDelete){
            deleteStory(storyId);
        }
    };

    var deleteStory = function(storyId){
        var data = $.param({
            userId: $rootScope.uid,
            storyId: storyId
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/deletestory.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert("Stories: " + data.message);
                } else {

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
                    console.log(data.stories);
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