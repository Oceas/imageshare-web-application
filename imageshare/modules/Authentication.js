var imageShareAuthenticationServices = angular.module('authenticationServices',['ngCookies']);

imageShareAuthenticationServices.factory('checkCreds',
    ['$cookies', function($cookies){
        return function(){
            var returnVal = false;
            var userCreds = $cookies.userCreds;
            if (userCreds !== undefined && userCreds !== ""){
                returnVal = true;
            }
            return returnVal;
        };
    }]);

imageShareAuthenticationServices.factory('getToken',
    ['$cookies', function($cookies){
        return function(){
            var returnVal = "";
            var userCreds = $cookies.userCreds;
            if (userCreds !== undefined && userCreds !== ""){
                returnVal = btoa(userCreds);
            }
            return returnVal;
        };
    }]);

imageShareAuthenticationServices.factory('getUsername',
    ['$cookies', function($cookies){
        return function(){
            var returnVal = "";
            var username = $cookies.username;
            if (userCreds !== undefined && username !== ""){
                returnVal = username;
            }
            return returnVal;
        };
    }]);

imageShareAuthenticationServices.factory('setCreds',
    ['$cookies', function($cookies){
        return function(un,pw){
            var token = un.concat(":",pw);
            $cookies.userCreds = token;
            $cookies.username = un;
        };
    }]);

imageShareAuthenticationServices.factory('detleteCreds',
    ['$cookies', function($cookies){
        return function(){
            $cookies.userCreds = "";
            $cookies.username = "";
        };
    }]);