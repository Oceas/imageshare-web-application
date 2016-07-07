/**
 * Created by scottanderson on 6/27/16.
 */

/*Controllers are where we define our app's behavior by defining
 functions and values */

(function () {
    var app = angular.module('user-authentication', []);


    app.directive('loginForm', function () {
        return {
            restrict: 'E',
            templateUrl: '../templates/pages/authentication/login.html',
            controller: function () {
               this.email = "";
               this.password ="";
            },
            controllerAs: 'login'
        };
    });

    app.controller("AuthenticationController", function ($http) {

        this.login = function () {
            var params = JSON.stringify({email: "", password: ""});
            $http.post('http://imageshare.io/api/login.php', params).success(function(response) {
                alert("Success!");

                // this callback will be called asynchronously
                // when the response is available
                console.log(response);
            }).
            error(function() {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Failed");
            });
        };
    });

})();

