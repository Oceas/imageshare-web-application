angular.module('imageshare').config(function ($routeProvider) {
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