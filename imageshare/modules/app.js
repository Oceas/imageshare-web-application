/**
 * Created by scottanderson on 6/27/16.
 */

/*Controllers are where we define our app's behavior by defining
 functions and values */

(function () {
    var imageshare = angular.module('imageshare', ['ngRoute','authenticationServices']);

    imageshare.config(function($routeProvider) {
        $routeProvider
        // route for the home page
            .when('/', {
                templateUrl : '../pages/home.html',
                controller  : 'mainController'
            })

            // route for the login page
            .when('/login', {
                templateUrl : '../pages/login.html',
                controller  : 'loginController'
            })

            // route for the register page
            .when('/register', {
                templateUrl : '../pages/register.html',
                controller  : 'registerController'
            });
    });

    imageshare.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    imageshare.controller('loginController', function($scope,$http) {
        $scope.message = 'Look! I am an about page.';

        $scope.login = function () {
            // use $.param jQuery function to serialize data from JSON
            var data = $.param({
                email: $scope.email,
                password: $scope.password
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('http://imageshare.io/api/login.php', data, config)
                .success(function (data) {
                    if(data.error){
                        alert(data.message);
                    }else{

                    }
                    console.log(data);
                })
                .error(function (data, status, header, config) {
                });
        };

    });

    imageshare.controller('registerController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    imageshare.controller('navigationController', function($scope){

    });

})();