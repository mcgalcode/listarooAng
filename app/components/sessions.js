angular.module("listaroo").
  component("sessions", {
    templateUrl: '/views/login.html',
    controller: function($scope, $cookies, $location, sessionService) {

      $scope.submitLogin = function(username, password) {
        sessionService.submitLogin(username, password, function(response) {
          $cookies.putObject('user', response.data);
          $location.path('/teams');
        })
      }

    }
  });
