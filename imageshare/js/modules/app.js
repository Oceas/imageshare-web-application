/**
 * Created by scottanderson on 6/27/16.
 */

/*Controllers are where we define our app's behavior by defining
 functions and values */

(function () {
    var imageshare = angular.module('imageshare', ['ngRoute', 'authenticationServices']);
    
    imageshare.run(['$rootScope', '$location', 'loggedIn', function ($rootScope, $location, loggedIn) {
        $rootScope.$on('$routeChangeStart', function () {
            if ($location.$$path !== "/login" && $location.$$path !== "/" && $location.$$path !== "/logout" && $location.$$path !== "/register" && $location.$$path !== "/oceas") {
                if (loggedIn()) {
                    //Let the route complete
                } else {
                    //Override route to Log In Page
                    $location.path('/login');
                }
            }
        });
    }]);

})();