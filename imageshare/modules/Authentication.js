var authenticationServices = angular.module('authenticationServices',['ngCookies']);

authenticationServices.factory('checkCreds',
    ['cookies', function($cookies){
        return function(){
            var returnVal = false;
            var userCreds = $cookies.userCreds;
            if (userCreds !== undefined && userCreds !== ""){
                returnVal = true;
            }
            return returnVal;
        };
    }]);