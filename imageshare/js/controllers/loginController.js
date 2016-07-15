angular.module('imageshare').controller('logInController', ['$rootScope', '$scope', '$http', 'setCredentials', 'loggedIn', '$window', function ($rootScope, $scope, $http, setCredentials, loggedIn, $window) {

    $scope.login = function () {
        // use $.param jQuery function to serialize data from JSON
        var data = $.param({
            email: $scope.email,
            password: $scope.password
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('http://imageshare.io/api/login.php', data, config)
            .success(function (data) {
                if (data.error) {
                    alert(data.message);
                } else {
                    setCredentials($scope.email, $scope.password, data.uid, data.user.name);
                    $rootScope.loggedIn = loggedIn();
                    $rootScope.loggedOut = !loggedIn();
                    console.log("Credentials set!");
                    $window.location.href = '#/';

                }
                console.log(data);
            })
            .error(function (data, status, header, config) {

            });
    };

}]);