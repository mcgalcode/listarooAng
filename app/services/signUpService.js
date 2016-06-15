angular.module("listaroo").
  service("signUpService", function($http) {
    var rootUrl = "http://localhost:3000";

    this.submitSignUp = function(newUser, callback) {
      $http.post(
        rootUrl + '/api/signup',
        newUser
      ).then(callback);
    };

  });
