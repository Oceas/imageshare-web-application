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
                templateUrl: '../../partials/pages/home.html',
                controller: 'mainController'
            })

            // route for the login page
            .when('/login', {
                templateUrl: '../../partials/pages/login.html',
                controller: 'logInController'
            })

            // route for the register page
            .when('/register', {
                templateUrl: '../../partials/pages/register.html',
                controller: 'registrationController'
            })

            // route for user logging out
            .when('/logout', {
                templateUrl: '../../partials/pages/logout.html',
                controller: 'logOutController'
            });
    });

    imageshare.run(['$rootScope', '$location', 'loggedIn', function ($rootScope, $location, loggedIn) {
        $rootScope.$on('$routeChangeStart', function () {
            if ($location.$$path !== "/login" && $location.$$path !== "/" && $location.$$path !== "/logout" && $location.$$path !== "/register") {
                console.log("Route change!");
                if (loggedIn()) {
                    //Let the route complete
                } else {
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
            templateUrl: '../../partials/navigation/menu.html',
            controller: 'navigationController'
        };
    });
    
})();