angular.module("listaroo").
  component("sessions", {
    templateUrl: '/views/login.html',
    controller: function($scope, $cookies, $location, sessionService) {

      $scope.errorsPresent = false;
      $scope.errorMessages = [];
      $scope.usernameRequired = "You must provide a username to log in"
      $scope.passwordRequired = "You must provide a password to log in"

      $scope.clearErrors = function() {
        $scope.errorsPresent = false;
        $scope.errorMessages = [];
      }

      $scope.submitLogin = function() {
        username = $scope.username;
        password = $scope.password;
        $scope.errorsPresent = false;
        $scope.errorMessages = [];
        if (!$scope.errorsPresent) {
          sessionService.submitLogin(username, password,
            function(response) {
              $cookies.putObject('user', response.data);
              $location.path('/teams');
            },
            function(response) {
              $scope.errorsPresent = true;
              $scope.errorMessages.push(response.data.errors)
              $scope.username = "";
              $scope.password = "";
            }
          );
        }
      }

    }
  });
