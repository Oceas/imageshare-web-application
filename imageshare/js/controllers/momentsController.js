angular.module('imageshare').controller('momentsController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {
    $scope.moments = {};


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
                    alert("Moment Created!")
                }
            })
            .error(function () {

            });
    };

    var loadMoments = function() {
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