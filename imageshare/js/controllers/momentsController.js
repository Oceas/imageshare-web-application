angular.module('imageshare').controller('momentsController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {
    $scope.moments = {};

    $scope.stories = {};

    var momentsToDelete = {};

    $scope.setToBeDeleted = function(moment){
        if(momentsToDelete[moment]){
            momentsToDelete[moment] = false;
        }else{
            momentsToDelete[moment] = true;
        }
    };

    $scope.isToBeDeleted = function(moment){
        return momentsToDelete[moment] == true;
    };

    $scope.delete = function(){
        for(var momentId in momentsToDelete){
            deleteMoment(momentId);
        }
    };

    var deleteMoment = function(albumId){
        var data = $.param({
            userId: $rootScope.uid,
            albumId: albumId
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/deletealbum.php', data, config)
            .success(function (data) {
                if (data.error) {
                    console.log("Moments Delete: " + data.message);
                } else {
                    console.log("Successfully deleted Album with ID" + albumId);
                }
            })
            .error(function () {

            });
    };

    $scope.createMoment = function() {
        var data = $.param({
            userId: $rootScope.uid,
            albumName: $scope.albumName,
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

    var loadMoments = function() {
        console.log("Loading moments");
        var data = $.param({
            userId: $rootScope.uid,
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/getalbums.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert("Moments: " + data.message);
                } else {
                    $scope.moments = data.albums;
                    $scope.moments.forEach(loadPhotos);
                }
            })
            .error(function () {

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
                }
            })
            .error(function () {
                console.log("ERROR!");
            });
    };

    loadMoments();


}]);