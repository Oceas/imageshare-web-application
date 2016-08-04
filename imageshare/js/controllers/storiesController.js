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
        console.log("Loading stories");
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
                    console.log($scope.stories.length);
                    for (var story in $scope.stories){
                        console.log("Hello");
                        // loadMoments(story)
                    }
                    $scope.stories.forEach(loadMoments);
                }
            })
            .error(function () {

            });
    };


    var loadMoments = function(story, index) {
        console.log("Loading");
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
                    console.log(data.story.momments);
                    $scope.stories[index].moments = data.story.momments;
                    // console.log($scope.stories[index].moments);
                }
            })
            .error(function () {

            });
    };


    // var loadPhotos = function(moment, index) {
    //     var data = $.param({
    //         userId: $rootScope.uid,
    //         albumId: moment.albumId
    //     });
    //
    //     var config = {
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    //         }
    //     };
    //     $http.post('http://imageshare.io/api/v1/getalbumdetail.php', data, config)
    //         .success(function (data) {
    //             if (data.error) {
    //                 alert(data.message);
    //             } else {
    //                 $scope.moments[index].images = data.album.images;
    //             }
    //         })
    //         .error(function () {
    //             console.log("ERROR!");
    //         });
    // };

    loadStories();

}]);