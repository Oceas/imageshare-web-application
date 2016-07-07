/**
 * Created by scottanderson on 6/27/16.
 */

/*Controllers are where we define our app's behavior by defining
 functions and values */

(function () {
    var app = angular.module('imageshare', []);


    app.controller('PeopleController', function ($scope, $http) {
        this.name = "Bob";
        $http.post('http://192.168.33.22/testing.json').success(function (response) {
            $scope.persons = response.records;
        });
    });

    app.controller("TestingController", function () {
        this.name = "Bob";
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

