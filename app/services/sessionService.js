angular.module("listaroo").
  service("sessionService", function($http, $cookies, $rootScope) {

    var rootUrl = $rootScope.baseUrl;

    this.submitLogin = function(username, password, callback) {
      $http.post(
        rootUrl + '/api/login',
        { 'username' : username, 'password' : password }
      ).then(callback);
    };

    this.logout = function(id, successCallback) {
      $http.delete(
        rootUrl + '/api/' + id + '/logout'
      ).then(successCallback);
    }


  });
