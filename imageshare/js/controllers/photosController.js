angular.module('imageshare').controller('photosController', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {
    $scope.moments = {};

    var photosToDelete = {};

    $scope.setToBeDeleted = function(photo){
        if(photosToDelete[photo]){
            photosToDelete[photo] = false;
        }else{
            photosToDelete[photo] = true;
        }
    };

    $scope.isToBeDeleted = function(photo){
        return photosToDelete[photo] == true;
    };

    $scope.delete = function(){
        for(var photoId in photosToDelete){
            deletePhoto(photoId);
        }
    };

    var deletePhoto = function (photoId){
        var data = $.param({
            imageId: photoId,
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/deleteimage.php', data, config)
            .success(function (data) {
                if (data.error) {
                    console.log("Photos Delete: " + data.message);
                } else {
                   console.log("Successfully deleted " + photoId);
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
                    console.log("Moments: " + data.message);
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
                    console.log(data.message);
                } else {
                    $scope.moments[index].photos = data.album.images;
                }
            })
            .error(function () {
                console.log("ERROR!");
            });
    };





    var updatePhotoInformation = function(albumId,photo){

        var data = $.param({
            userId: $rootScope.uid,
            albumId: albumId
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post('http://imageshare.io/api/v1/getalbumdetail.php', data, config)
            .success(function (data) {
                if (data.error) {
                    console.log(data.message);
                } else {
                    var images = data.album.images;

                    photo.imageId = images[images.length - 1].imageId;

                    if(photo.imageId == null){
                    }else{
                        console.log("Safe!");
                        console.log(photo.imageId);
                    }


                    var newData = $.param({
                        imageId: photo.imageId,
                        caption: photo.caption,
                        imageDesc: photo.description,
                        location: photo.location
                    });

                    $http.post('http://imageshare.io/api/v1/editimage.php', newData ,config).success(function (data) {
                        if (data.error) {
                            console.log(newData);
                            console.log("Photo Edit: " + data.message);
                            console.log(data);
                        } else {
                            console.log(data);
                            console.log("Photo Edit: Successfully updated!");
                        }
                    }).error(function () {

                    });

                }
            })
            .error(function () {
                console.log("ERROR!");
            });


    };



    loadMoments();

}]);