/**
 * Created by scottanderson on 6/27/16.
 */

/*Controllers are where we define our app's behavior by defining
 functions and values */

(function () {
    var imageshare = angular.module('imageshare', ['ngRoute', 'authenticationServices']);

    imageshare.config(function ($routeProvider) {
        $routeProvider
        // route for the home page
            .when('/', {
                templateUrl: '../partials/pages/home.html',
                controller: 'mainController'
            })

            // route for the login page
            .when('/login', {
                templateUrl: '../partials/pages/login.html',
                controller: 'loginController'
            })

            // route for the register page
            .when('/register', {
                templateUrl: '../partials/pages/register.html',
                controller: 'registerController'
            })

            // route for user logging out
            .when('/logout', {
                templateUrl: '../partials/pages/logout.html',
                controller: 'logOutController'
            });
    });

    imageshare.directive('navigationMenu', function () {
        return {
            restrict: 'E',
            templateUrl: '../partials/navigation/menu.html',
            controller: 'navigationController'
        };
    });

    imageshare.controller('mainController', function ($scope) {
        // create a message to display in our view

        $scope.message = 'Welcome to Imageshare the best story telling platform!';

    });

    imageshare.controller('loginController', function ($scope, $http) {

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

                    }
                    console.log(data);
                })
                .error(function (data, status, header, config) {
                });
        };

    });

    imageshare.controller('registerController', function ($scope) {

    });

    imageshare.controller('logOutController', function ($scope) {
        $scope.message = 'You are now logged out!';
    });

    imageshare.controller('navigationController', function () {
    });

})();