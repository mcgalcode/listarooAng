angular.module("listaroo").
  service("sessionService", function($http, $cookies) {
    var rootUrl = "http://localhost:3000";

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
