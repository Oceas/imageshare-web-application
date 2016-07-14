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

    imageshare.run(['$rootScope', '$location', 'loggedIn' , function ($rootScope, $location, loggedIn) {
        $rootScope.$on('$routeChangeStart', function () {
            if($location.$$path !== "/login" && $location.$$path !== "/" && $location.$$path !== "/logout" && $location.$$path !== "/register"){
                console.log("Route change!");
                if(loggedIn()){
                    //Let the route complete
                }else{
                    //Override route to Log In Page
                    console.log("Please Log In!");
                    $location.path('/login');
                }
            }
        });
    }]);

    imageshare.directive('navigationMenu', function () {
        return {
            restrict: 'E',
            templateUrl: '../partials/navigation/menu.html',
            controller: 'navigationController'
        };
    });

    imageshare.controller('mainController', ['updateSystemSettings','getUsername','$scope', function (updateSystemSettings,getUsername,$scope) {
        // create a message to display in our view
        if(getUsername !== undefined){
            $scope.username = getUsername();
        }
        updateSystemSettings();
        $scope.message = 'Welcome to Imageshare the best story telling platform!';
    }]);

    imageshare.controller('loginController',['$rootScope','$scope','$http','setCredentials','loggedIn','$window', function ($rootScope,$scope, $http,setCredentials,loggedIn,$window) {

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
                        $window.location.href = '#/';
                        console.log("Credentials set!");
                    }
                    console.log(data);
                })
                .error(function (data, status, header, config) {

                });
        };

    }]);

    imageshare.controller('registerController', function ($scope) {

    });

    imageshare.controller('logOutController',['$scope','deleteCredentials', function ($scope,deleteCredentials) {
        $scope.message = 'You are now logged out!';
        deleteCredentials();
    }]);

    imageshare.controller('navigationController',['$rootScope','loggedIn' , function ($rootScope,loggedIn) {

    }]);

})();