angular.module('imageshare').controller('photosController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {
    $scope.moments = {};

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
                    console.log(data.albums);
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
                    console.log(data.album.images);
                    $scope.moments[index].photos = data.album.images;
                    console.log("Loaded photos for " + moment.albumName);
                }
                console.log(data);
            })
            .error(function () {
                console.log("ERROR!");
            });
    };

    loadMoments();

    $scope.filesChanged = function (element){
        $scope.file = element.files[0];
        $scope.$apply();
    };

    $scope.upload = function(){
        var data = new FormData();
        data.append('userId', $rootScope.uid);
        data.append('albumId', $scope.momentSelection);
        data.append('fileToUpload[]',$scope.file);

        var config = {
            transformRequest:angular.identity,
            headers: {
                'Content-Type': undefined
            }
        };
        $http.post('http://imageshare.io/api/v1/uploadimage.php',data,config).success(function (data) {
            if (data.error) {
                alert("Photo: " + data.message);
                console.log(data);
            } else {
                console.log(data);
                alert("Successfully uploaded!");
            }
        }).error(function () {

        });
    }

}]);