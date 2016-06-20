angular.module("listaroo").
  component("sessions", {
    templateUrl: '/views/login.html',
    controller: function($scope, $cookies, $location, sessionService) {

      $scope.errorsPresent = false;
      $scope.errorMessages = [];
      $scope.usernameRequired = "You must provide a username to log in"
      $scope.passwordRequired = "You must provide a password to log in"

      $scope.submitLogin = function(username, password) {
        $scope.errorsPresent = false;
        username = username.trim();
        password = password.trim();
        if (username.length < 1 ) {
          $scope.errorsPresent = true;
          $scope.errorMessages.push($scope.usernameRequired);
        }
        if (password.length < 1 ) {
          $scope.errorsPresent = true;
          $scope.errorMessages.push($scope.passwordRequired);
        }
        if (!$scope.errorsPresent) {
          sessionService.submitLogin(username, password, function(response) {
            $cookies.putObject('user', response.data);
            $location.path('/teams');
          });
        }
      }

    }
  });
