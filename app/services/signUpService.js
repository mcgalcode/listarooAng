angular.module("listaroo").
  service("signUpService", function($http, $rootScope) {
    var rootUrl = $rootScope.baseUrl;

    this.submitSignUp = function(newUser, callback) {
      $http.post(
        rootUrl + '/api/signup',
        newUser
      ).then(callback);
    };

  });
