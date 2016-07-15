var imageShareAuthenticationServices = angular.module('authenticationServices',['ngCookies']);

imageShareAuthenticationServices.factory('loggedIn',
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
            if (username !== undefined && username !== ""){
                returnVal = username;
            }
            return returnVal;
        };
    }]);

imageShareAuthenticationServices.factory('getUID',
    ['$cookies', function($cookies){
        return function(){
            var returnVal = "";
            var uid = $cookies.uid;
            if (uid !== undefined && uid !== ""){
                returnVal = uid;
            }
            return returnVal;
        };
    }]);

imageShareAuthenticationServices.factory('setCredentials',
    ['$cookies','updateSystemSettings', function($cookies,updateSystemSettings){
        return function(email,pw,uid,username){
            var token = email.concat(":",pw);
            $cookies.userCreds = token;
            $cookies.email = email;
            $cookies.uid = uid;
            $cookies.username = username;
            updateSystemSettings();
        };
    }]);

imageShareAuthenticationServices.factory('deleteCredentials',
    ['$cookies','updateSystemSettings', function($cookies,updateSystemSettings){
        return function(){
            $cookies.userCreds = "";
            $cookies.email = "";
            $cookies.uid = "";
            $cookies.username = "";
            updateSystemSettings();
        };
    }]);

imageShareAuthenticationServices.factory('updateSystemSettings',
    ['$rootScope','loggedIn','getUID',function($rootScope,loggedIn,getUID){
        return function(){
            $rootScope.loggedIn = loggedIn();
            $rootScope.loggedOut = !loggedIn();
            $rootScope.uid = getUID();
        };
    }]);


