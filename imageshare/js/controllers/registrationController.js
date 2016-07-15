angular.module('imageshare').controller('registrationController', ['$http', '$scope','$window', function ($window,$http, $scope) {
    $scope.register = function () {
        // use $.param jQuery function to serialize data from JSON
        var data = $.param({
            email: $scope.email,
            password: $scope.password,
            name: $scope.displayName
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('http://imageshare.io/api/register.php', data, config)
            .success(function (data) {

                if (data.error) {
                    alert(data.message);
                    console.log(data);
                } else {
                    alert("Registered!");
                    console.log(data);
                }
            })

            .error(function (data) {

            });
    };
}]);